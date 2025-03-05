<?php

use App\Http\Controllers\Web\Activity\ActivityController;
use Illuminate\Support\Facades\Route;

Route::prefix("activities")
    ->as('activities.')
    ->group(function () {

        Route::get("/", [ActivityController::class, "get"])->name('get');
        Route::get("types", [ActivityController::class, "getTypes"])->name('types');

    });
