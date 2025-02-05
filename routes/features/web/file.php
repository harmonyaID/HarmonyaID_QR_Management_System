<?php

use App\Http\Controllers\Web\File\UploadController;
use Illuminate\Support\Facades\Route;

Route::post('file/upload', [UploadController::class, 'create'])->name('file.upload');