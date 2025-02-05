<?php

namespace App\Http\Controllers\Web\File;

use App\Algorithms\File\UploadAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\File\UploadRequest;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function create(UploadRequest $request)
    {
        $algo = new UploadAlgo;
        return $algo->handle($request);
    }
}
