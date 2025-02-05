<?php

use Illuminate\Support\Facades\Route;

$version = config('core.version');
$base = base_path("routes/features/web/");

require($base . "activity.php");
require($base . "auth.php");

Route::middleware(['auth:web'])
    ->group(function () use ($base) {

        require($base . "account.php");
        require($base . "file.php");

    });