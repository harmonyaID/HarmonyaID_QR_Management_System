<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(using: function () {
        $namespace = 'App\\Http\\Controllers';

        $version = config('core.version');

        Route::match(['get', 'post'], 'testing', "$namespace\\Controller@testing");

        Route::prefix(config('core.prefix.web') . "/$version")
            ->middleware(['web'])
            ->as('web.')
            ->group(base_path('routes/web.php'));

        Route::middleware(['web'])
            ->as('frontend.')
            ->group(base_path('routes/frontend.php'));
    })
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            HandleInertiaRequests::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->withSchedule(function () {
        //
    })->create();
