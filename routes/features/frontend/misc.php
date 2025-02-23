<?php

use App\Http\Controllers\Frontend\Misc\FaqController;
use Illuminate\Support\Facades\Route;

Route::prefix('frequently-asked-questions')
    ->as('faqs.')
    ->group(function () {

        Route::get('/', [FaqController::class, 'index'])->name('index');
        Route::get('manage', [FaqController::class, 'manage'])->name('manage');

    });