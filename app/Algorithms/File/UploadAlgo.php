<?php

namespace App\Algorithms\File;

use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UploadAlgo
{
    public function handle (Request $request)
    {
        $file = $request->file('file');
        $directory = 'temp/' . $request->group;

        if (!Storage::exists($directory)) {
            Storage::createDirectory($directory);
        }

        $clientName     = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $clientExtension= $file->getClientOriginalExtension();
        $generatedName  = $clientName . '-' . time();

        if (!empty($request->toWebp)) {
            $generatedName = $this->toWebp($file, $directory . '/' . $generatedName);
            if (!$generatedName) {
                errInvalid('Unable to convert this file into .webp');
            }

            return success(['file' => $generatedName]);
        } 

        $generatedName .= '.' . $clientExtension;
        $file->storeAs($directory . '/' . $generatedName);

        return success($directory . '/' . $generatedName);
    }


    private function toWebp (UploadedFile $file, string $outputName, int $compressionQuality = 80) : string | false
    {
        $fileMime = $file->getClientMimeType();
        $fileMime = explode('/', $fileMime);
        $fileType = $fileMime[1];

        if ($fileMime[0] != 'image') {
            return false;
        }

        $outputFileName = $outputName . '.webp';

        if ($fileType == 'webp') {
            $file->storeAs($outputFileName);
            return $outputFileName;
        }

        if (class_exists('Imagick')) {
            $image = new \Imagick();
            $image->readImage($file);
            $image->writeImage(storage_path("app/{$outputFileName}"));

            return $outputFileName;
        }

        if (!function_exists('imagewebp')) {
            return false;
        }

        switch ($fileType) {
            case 'gif':
                $image = imagecreatefromgif($file);
                break;

            case 'jpeg':
                $image = imagecreatefromjpeg($file);
                break;

            case 'png':
                $image = imagecreatefrompng($file);
                imagepalettetotruecolor($image);
                imagealphablending($image, true);
                imagesavealpha($image, true);
                break;

            default: 
                return false;
        }

        $result = imagewebp($image, storage_path("app/{$outputFileName}"), $compressionQuality);
        if (!$result) {
            return false;
        }

        imagedestroy($image);
        return $outputFileName;
    }
}