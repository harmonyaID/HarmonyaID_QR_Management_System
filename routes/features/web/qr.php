<?php

use App\Http\Controllers\Web\Qr\QrController;
use App\Http\Controllers\Web\Qr\QrTypeController;
use Illuminate\Support\Facades\Route;

Route::prefix('qr-codes')
    ->as('qr-codes.')
    ->group(function () {

        Route::prefix('types')
            ->as('types.')
            ->group(function () {

                Route::get('/', [QrTypeController::class, 'get'])->name('get');
                Route::post('/', [QrTypeController::class, 'create'])->name('create');
                Route::put('{id}', [QrTypeController::class, 'update'])->name('update');
                Route::delete('{id}', [QrTypeController::class, 'delete'])->name('delete');

            });

        Route::get('/', [QrController::class, 'get'])->name('get');
        Route::post('/', [QrController::class, 'create'])->name('create');
        Route::put('{id}', [QrController::class, 'update'])->name('update');
        Route::delete('{id}', [QrController::class, 'delete'])->name('delete');

    });