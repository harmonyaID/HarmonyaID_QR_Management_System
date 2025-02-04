<?php

use Illuminate\Support\Facades\Route;

$base = base_path("routes/features/frontend/");

require($base . "auth.php");

Route::get('/', function () {
    return response()->redirectToRoute('frontend.auth.login');
});

Route::prefix('app')
    ->as('app.')
    ->middleware('auth')
    ->group(function () use ($base) {
        require($base . "dashboard.php");
    });