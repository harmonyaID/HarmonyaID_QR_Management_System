<?php

use App\Http\Controllers\Frontend\Qr\QrController;
use App\Http\Controllers\Frontend\Qr\QrSettingController;
use Illuminate\Support\Facades\Route;

Route::prefix('qr-codes')
    ->as('qrs.')
    ->group(function () {

        Route::get('create', [QrController::class, 'create'])->name('create');

        Route::get('settings', [QrSettingController::class, 'index'])->name('settings');

    });