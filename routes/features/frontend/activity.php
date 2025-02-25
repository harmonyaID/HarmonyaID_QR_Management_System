<?php

use App\Http\Controllers\Frontend\Activity\ActivityController;
use Illuminate\Support\Facades\Route;

Route::prefix('activities')
    ->as('activities.')
    ->middleware(['auth:web'])
    ->group(function () {
        Route::get('/', [ActivityController::class, 'index'])->name('index');
    });