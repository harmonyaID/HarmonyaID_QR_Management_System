<?php

use App\Http\Controllers\Frontend\Account\AccountController;
use App\Http\Controllers\Frontend\Account\UsageCategoryController;
use Illuminate\Support\Facades\Route;

Route::prefix('accounts')
    ->as('accounts.')
    ->middleware(['auth:web'])
    ->group(function () {
        Route::get('/', [AccountController::class, 'index'])->name('index');
        Route::get('usage-category', [UsageCategoryController::class, 'index'])->name('usage-category');
    });