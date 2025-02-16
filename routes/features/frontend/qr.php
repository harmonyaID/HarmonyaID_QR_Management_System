<?php

use App\Http\Controllers\Frontend\Qr\QrController;
use App\Http\Controllers\Frontend\Qr\QrSettingController;
use Illuminate\Support\Facades\Route;

Route::prefix('qr-codes')
    ->as('qr-codes.')
    ->group(function () {

        Route::get('settings', [QrSettingController::class, 'index'])->name('settings');
        
        Route::get('/', [QrController::class, 'index'])->name('index');
        Route::get('create', [QrController::class, 'create'])->name('create');
        Route::get('{id}', [QrController::class, 'edit'])->name('edit');
        Route::get('{id}/image', [QrController::class, 'image'])->name('image');
        Route::get('{id}/embed-image', [QrController::class, 'embeddedImage'])->name('embed-image');

    });