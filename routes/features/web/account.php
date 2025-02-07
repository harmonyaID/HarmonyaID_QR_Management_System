<?php

use App\Http\Controllers\Web\Account\PlanController;
use App\Http\Controllers\Web\Account\UsageCategoryController;
use Illuminate\Support\Facades\Route;

Route::prefix('accounts')
    ->as('accounts.')
    ->group(function () {

        Route::prefix('plans')
            ->as('plans.')
            ->group(function () {

                Route::get('/', [PlanController::class, 'get'])->name('get');
                Route::post('/', [PlanController::class, 'create'])->name('create');
                Route::put('{id}', [PlanController::class, 'update'])->name('update');
                Route::delete('{id}', [PlanController::class, 'delete'])->name('delete');

            });

        Route::prefix('usage-categories')
            ->as('usage-categories.')
            ->group(function () {

                Route::get('/', [UsageCategoryController::class, 'get'])->name('get');
                Route::post('/', [UsageCategoryController::class, 'create'])->name('create');
                Route::put('{id}', [UsageCategoryController::class, 'update'])->name('update');
                Route::delete('{id}', [UsageCategoryController::class, 'delete'])->name('delete');

            });

    });