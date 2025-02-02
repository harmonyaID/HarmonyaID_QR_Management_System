<?php

use App\Http\Controllers\Frontend\Dashboard\DashboardController;
use Illuminate\Support\Facades\Route;

Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard.index');