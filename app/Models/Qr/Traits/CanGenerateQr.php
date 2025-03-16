<?php

namespace App\Models\Qr\Traits;

use App\Services\Constant\Qr\QrDataType;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Process;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

trait CanGenerateQr
{
    public static function generate(string $name, 
                                    array $data, 
                                    int $dataTypeId, 
                                    array $styles) : string | false
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

        $value = QrDataType::processData($data, $dataTypeId);

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

        $command = config('python.alias');
        $command .= " generator.py ";
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
