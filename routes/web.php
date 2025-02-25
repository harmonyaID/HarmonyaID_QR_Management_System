<?php

use Illuminate\Support\Facades\Route;

$version = config('core.version');
$base = base_path("routes/features/web/");

require($base . "auth.php");
require($base . "misc.php");

Route::middleware(['auth:web'])
    ->group(function () use ($base) {
    
        require($base . "account.php");
        require($base . "activity.php");
        require($base . "dashboard.php");
        require($base . "file.php");
        require($base . "qr.php");

    });