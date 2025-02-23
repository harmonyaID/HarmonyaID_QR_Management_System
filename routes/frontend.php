<?php

use Illuminate\Support\Facades\Route;

$base = base_path("routes/features/frontend/");

require($base . "auth.php");

Route::get('/', function () {
    return response()->redirectToRoute('frontend.auth.login');
});

Route::prefix('setup')
    ->as('setup.')
    ->middleware('auth')
    ->group(function () use ($base) {
        require($base . "setup.php");
    });

Route::prefix('app')
    ->as('app.')
    ->middleware('auth')
    ->group(function () use ($base) {
        require($base . "account.php");
        require($base . "dashboard.php");
        require($base . "misc.php");
        require($base . "qr.php");
    });