<?php

use App\Http\Controllers\Web\Activity\ActivityController;
use App\Http\Controllers\Web\Misc\FaqController;
use App\Http\Controllers\Web\Misc\SystemController;
use Illuminate\Support\Facades\Route;

Route::prefix('misc')
    ->as('misc.')
    ->group(function () {

        Route::get('faqs', [FaqController::class, 'get'])->name('faqs.get');
       
        Route::middleware(['auth'])
            ->group(function () {

                Route::prefix('faqs')
                    ->as('faqs.')
                    ->group(function() {

                        Route::post('create', [FaqController::class, 'create'])->name('create');
                        Route::put('{id}', [FaqController::class, 'update'])->name('update');
                        Route::delete('{id}', [FaqController::class, 'delete'])->name('delete');

                    });

                Route::prefix('system')
                    ->as('system.')
                    ->group(function () {

                        Route::get('/', [SystemController::class, 'get'])->name('get');
                        Route::get('size', [SystemController::class, 'getSize'])->name('size');

                    });


                Route::prefix('activities')
                    ->as('activities.')
                    ->group(function () {

                        Route::get('/', [ActivityController::class, 'get'])->name('get');
                        Route::get('types', [ActivityController::class, 'getTypes'])->name('types');

                    });

            });

    });