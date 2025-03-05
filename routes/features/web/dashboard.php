<?php

use App\Http\Controllers\Web\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')
    ->as('dashboard.')
    ->group(function () {

        Route::get('/', [DashboardController::class, 'get'])->name('get');

    });