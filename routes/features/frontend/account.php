<?php

use App\Http\Controllers\Frontend\Account\AccountController;
use App\Http\Controllers\Frontend\Account\PlanController;
use App\Http\Controllers\Frontend\Account\SettingController;
use App\Http\Controllers\Frontend\Account\UsageCategoryController;
use Illuminate\Support\Facades\Route;

Route::prefix('accounts')
    ->as('accounts.')
    ->middleware(['auth:web'])
    ->group(function () {
        Route::get('/', [AccountController::class, 'index'])->name('index');
        Route::get('settings', [SettingController::class, 'index'])->name('settings');

        Route::get('usage-category', [UsageCategoryController::class, 'index'])->name('usage-category');
        Route::get('usage-category/select', [UsageCategoryController::class, 'select'])->name('usage-category.select');
        
        Route::get('plans', [PlanController::class, 'index'])->name('plans');
    });