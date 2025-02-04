<?php

use App\Http\Controllers\Frontend\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('accounts')
    ->as('accounts.')
    ->middleware(['auth:web'])
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('index');
        Route::get('usage-category', [DashboardController::class, 'index'])->name('usage-category');
    });