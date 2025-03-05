<?php

namespace App\Http\Controllers\Web\File;

use App\Algorithms\File\UploadAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\File\UploadRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function get($any) {
        if (!Storage::exists($any)) {
            errNotFound('file');
        }

        return response()->file(storage_path("app/$any"));
    }

    public function create(UploadRequest $request)
    {
        $algo = new UploadAlgo;
        return $algo->handle($request);
    }
}
