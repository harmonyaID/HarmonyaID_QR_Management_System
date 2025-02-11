<?php

use App\Http\Controllers\Frontend\Qr\QrSettingController;
use Illuminate\Support\Facades\Route;

Route::prefix('qrs')
    ->as('qrs.')
    ->group(function () {

        Route::get('settings', [QrSettingController::class, 'index'])->name('settings');

    });