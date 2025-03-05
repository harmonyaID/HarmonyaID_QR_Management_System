<?php

use App\Http\Controllers\Web\File\UploadController;
use Illuminate\Support\Facades\Route;

Route::prefix('file')
    ->as('file.')
    ->group(function () {
        Route::get('{any}', [UploadController::class, 'get'])->name('get')->where('any', '.*'); 
        Route::post('/', [UploadController::class, 'create'])->name('upload'); 
    });
