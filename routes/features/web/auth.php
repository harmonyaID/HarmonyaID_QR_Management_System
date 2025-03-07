<?php

use App\Http\Controllers\Web\Auth\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->as('auth.')
    ->group(function() {

        Route::middleware('guest')
            ->group(function () {

                Route::post('login', [AuthController::class, "login"])->name('login');
                Route::post('register', [AuthController::class, "register"])->name('register');
                Route::post('forgot-password', [AuthController::class, "forgotPassword"])->name('forgot-password');
                Route::post('reset-password', [AuthController::class, "resetPassword"])->name('reset-password');

            });

        Route::middleware('auth')
            ->group(function () {

                Route::delete('logout', [AuthController::class, "logout"])->name('logout');

            });
    });