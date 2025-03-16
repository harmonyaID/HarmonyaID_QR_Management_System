<?php

namespace App\Algorithms\Misc;

use App\Services\Constant\Global\CacheKey;
use FilesystemIterator;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

class SystemAlgo
{
    private array $composerData = [];

    public function get()
    {
        $this->loadComposer();

        return success([
            'system'    => $this->getSystemEnv(),
            'server'    => $this->getServerEnv(),
            'packages'  => $this->getPackages(),
            'email'     => $this->getEmailEnv(),
        ]);
    }

    public function getSize()
    {
        if (Cache::has(CacheKey::APP_SIZE)) {
            $size = Cache::get(CacheKey::APP_SIZE);
            return success(['size' => $this->parseSize($size)]);
        }

        $size = $this->getDirSize(base_path());

        Cache::put(CacheKey::APP_SIZE, $size, now()->addHours(12));

        return success(['size' => $this->parseSize($size)]);
    }


    private function loadComposer()
    {
        $raw = file_get_contents(base_path('composer.json'));
        $this->composerData = json_decode($raw, true);
    }

    private function getSystemEnv()
    {
        return [
            'versions'      => [
                'laravel'   => App::version(),
                'app'       => $this->composerData['version'],
            ],
            'timezone'      => config('app.timezone'),
            'debug'         => [
                'channel'   => config('logging.default'),
                'mode'      => config('app.debug'),
            ],
            'dirWritable'   => [
                'storage'   => is_writable(base_path('storage')),
                'cache'     => is_writable(base_path('bootstrap/cache')),
            ],
            'storageLink'   => $this->checkStorageLink(),
        ];
    }

    private function checkStorageLink()
    {
        $path   = public_path('storage');
        $output = [
            'exists'        => false,
            'permission'    => '-',
        ];

        $output['exists'] = File::exists($path);
        if (!$output['exists']) {
            return $output;
        }

        $permissions = fileperms($path);
        switch ($permissions & 0xF000) {
            case 0xC000: // socket
                $permissionStr = 's';
                break;
            case 0xA000: // symbolic link
                $permissionStr = 'l';
                break;
            case 0x8000: // regular
                $permissionStr = 'r';
                break;
            case 0x6000: // block special
                $permissionStr = 'b';
                break;
            case 0x4000: // directory
                $permissionStr = 'd';
                break;
            case 0x2000: // character special
                $permissionStr = 'c';
                break;
            case 0x1000: // FIFO pipe
                $permissionStr = 'p';
                break;
            default: // unknown
                $permissionStr = 'u';
        }

        // Owner
        $permissionStr .= (($permissions & 0x0100) ? 'r' : '-');
        $permissionStr .= (($permissions & 0x0080) ? 'w' : '-');
        $permissionStr .= (($permissions & 0x0040) ?
            (($permissions & 0x0800) ? 's' : 'x' ) :
            (($permissions & 0x0800) ? 'S' : '-'));

        // Group
        $permissionStr .= (($permissions & 0x0020) ? 'r' : '-');
        $permissionStr .= (($permissions & 0x0010) ? 'w' : '-');
        $permissionStr .= (($permissions & 0x0008) ?
            (($permissions & 0x0400) ? 's' : 'x' ) :
            (($permissions & 0x0400) ? 'S' : '-'));

        // World
        $permissionStr .= (($permissions & 0x0004) ? 'r' : '-');
        $permissionStr .= (($permissions & 0x0002) ? 'w' : '-');
        $permissionStr .= (($permissions & 0x0001) ?
                (($permissions & 0x0200) ? 't' : 'x' ) :
                (($permissions & 0x0200) ? 'T' : '-'));

        $output['permission'] = $permissionStr;

        return $output;
    }

    private function getEmailEnv()
    {
        $selectedMailer = config('mail.default');
        $mailer = config("mail.mailers.{$selectedMailer}");

        $sender = config('mail.from');

        return [
            'transport' => !empty($mailer['transport']) ? $mailer['transport'] : '-',
            'url'       => !empty($mailer['url']) ? $mailer['url'] : '-',
            'host'      => !empty($mailer['host']) ? $mailer['host'] : '-',
            'port'      => !empty($mailer['port']) ? $mailer['port'] : '-',
            'username'  => !empty($mailer['username']) ? $mailer['username'] : '-',
            'password'  => !empty($mailer['password']) ? $mailer['password'] : '-',
            'encryption'=> !empty($mailer['encryption']) ? $mailer['encryption'] : '-',
            'sender'    => [
                'email' => !empty($sender['address']) ? $sender['address'] : '-',
                'name'  => !empty($sender['name']) ? $sender['name'] : '-',
            ],
        ];
    }

    private function getServerEnv()
    {
        return [
            'version'           => phpversion(),
            'software'          => !empty($_SERVER['SERVER_SOFTWARE']) ? $_SERVER['SERVER_SOFTWARE'] : '',
            'OS'                => php_uname(),
            'dbConnectionName'  => config('database.default'),
            'ssl'               => $this->isSSLIntalled(),
            'drivers'           => [
                'cache'         => config('cache.default'),
                'session'       => config('session.driver'),
            ],
            'mbstring'          => extension_loaded('mbstring'),
            'openssl'           => extension_loaded('openssl'),
            'curl'              => extension_loaded('curl'),
            'exif'              => extension_loaded('exif'),
            'pdo'               => extension_loaded('pdo'),
            'fileinfo'          => extension_loaded('fileinfo'),
            'tokenizer'         => extension_loaded('tokenizer'),
        ];
    }

    private function getPackages()
    {
        $require    = $this->composerData['require'];
        $packages   = [];
        
        foreach ($require as $package => $version) {
            if ($package == 'php') {
                continue;
            }

            $packages[] = [
                'name'      => $package,
                'version'   => $version,
            ];
        }

        return $packages;
    }

    private function isSSLIntalled()
    {
        return !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off';
    }

    private function getDirSize($path)
    {
        $size = 0;
        $path = realpath($path);
        if ($path !== false && $path != '' && file_exists($path)) {
            $dirIterator = new RecursiveDirectoryIterator($path, FilesystemIterator::SKIP_DOTS);

            foreach(new RecursiveIteratorIterator($dirIterator) as $item) {
                $size += $item->getSize();
            }
        }


        return $size;
    }

    private function parseSize($size)
    {
        $units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];
        $mod = 1024;
        $index = 0;
        while ($size > $mod) {
            $size /= $mod;
            $index++;
        }

        return round($size, 2) . ' ' . $units[$index];
    }
}