<?php

use App\Http\Controllers\Frontend\Auth\LoginController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->as('auth.')
    ->middleware('guest')
    ->group(function () {
        Route::get("login", [LoginController::class, 'index'])->name('login');
    });