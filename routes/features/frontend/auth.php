<?php

use App\Http\Controllers\Frontend\Auth\ForgetPasswordController;
use App\Http\Controllers\Frontend\Auth\LoginController;
use App\Http\Controllers\Frontend\Auth\RegisterController;
use App\Http\Controllers\Frontend\Auth\ResetPasswordController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')
    ->as('auth.')
    ->middleware('guest')
    ->group(function () {
        Route::get("login", [LoginController::class, 'index'])->name('login');
        Route::get("register", [RegisterController::class, 'index'])->name('register');
        Route::get("forgot-password", [ForgetPasswordController::class, 'index'])->name('forgot-password');
        Route::get("reset-password", [ResetPasswordController::class, 'index'])->name('reset-password');
    });