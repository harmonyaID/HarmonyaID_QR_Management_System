<?php

namespace App\Models\Qr\Traits;

use App\Services\Constant\Qr\QrDataType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

trait CanGenerateQr
{
    public static function generate(string $name, 
                                    array $data, 
                                    int $dataTypeId, 
                                    array $styles) : string | false
    {
        $value = QrDataType::processData($data, $dataTypeId);
        if (!$value) {
            return false;
        }

        $directory = "qr-codes/";
        if (Auth::user()) {
            $directory .= Auth::user()->id;
        } else {
            $directory .= 'guests';
        }

        if (!Storage::exists($directory)) {
            Storage::createDirectory($directory);
        }

        $slug = Str::slug($name);
        $fileName = $directory . '/' . $slug . '-' . time();

        switch (strtolower(config('qr.generator'))) {
            case 'php':
                return static::generatePhp($value, $fileName, $styles);

            default:
                return static::generatePython($value, $fileName, $styles);    
        }

    }

    private static function generatePhp(string $value, string $fileName, array $styles) : string | false
    {
        $image = null;
        if (!empty($styles['image'])) {
            if (!Storage::exists($styles['image'])) {
                errNotFound('Image');
            }

            $image = $styles['image'];
        }

        /** @var \SimpleSoftwareIO\QrCode\Generator */
        $generator = QrCode::size(1080)
            ->format('png')
            ->errorCorrection('H')
            ->margin(2);

        if ($image) {
            $generator->merge(storage_path('app/' . $image), .3 , true);
        }

        $filePath = storage_path('app/' . $fileName . '.png');
        $generator->generate($value, $filePath);

        return $fileName . '.png';
    }

    private static function generatePython(string $value, string $fileName, array $styles) : string | false
    {
        $styleOption = '';
        if (!empty($styles['qr_style'])) {
            $styleOption .= ' --style ' . $styles['qr_style'];
        }

        if (!empty($styles['image'])) {
            if (!Storage::exists($styles['image'])) {
                errNotFound('Image');
            }

            $styleOption .= ' --image "' . storage_path('app/' . $styles['image']) . '"';
        }

        if (PHP_OS_FAMILY == 'Windows') {
            $command = "generator ";
        } else {
            $command = "./generator";
        }
        
        $command .= '"' . $value . '" ';
        $command .= '"' . storage_path('app/' . $fileName) . '" ';
        $command .= $styleOption;

        $result = Process::path(base_path())->run($command);
        if ($result->successful()) {
            return $fileName . '.png';
        }

        Log::error($result->errorOutput());
        return false;
    }
}
