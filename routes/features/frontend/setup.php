<?php

use App\Http\Controllers\Frontend\Setup\UsageCategorySetupController;
use Illuminate\Support\Facades\Route;

Route::get('usage-category', [UsageCategorySetupController::class, 'index'])->name('usage-category');