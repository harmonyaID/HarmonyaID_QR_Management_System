<?php

use App\Http\Controllers\Web\Account\UsageCategoryController;
use Illuminate\Support\Facades\Route;

Route::prefix('accounts')
    ->as('accounts.')
    ->group(function () {

        Route::prefix('usage-categories')
            ->as('usage-categories.')
            ->group(function () {

                Route::get('/', [UsageCategoryController::class, 'get'])->name('get');
                Route::post('/', [UsageCategoryController::class, 'create'])->name('create');
                Route::put('{id}', [UsageCategoryController::class, 'update'])->name('update');
                Route::delete('{id}', [UsageCategoryController::class, 'delete'])->name('delete');

            });

    });