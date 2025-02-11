<?php

use App\Http\Controllers\Web\Qr\QrTypeController;
use Illuminate\Support\Facades\Route;

Route::prefix('qrs')
    ->as('qrs.')
    ->group(function () {

        Route::prefix('types')
            ->as('types.')
            ->group(function () {

                Route::get('/', [QrTypeController::class, 'get'])->name('get');
                Route::post('/', [QrTypeController::class, 'create'])->name('create');
                Route::put('{id}', [QrTypeController::class, 'update'])->name('update');
                Route::delete('{id}', [QrTypeController::class, 'delete'])->name('delete');

            });

        

    });