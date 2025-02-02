<?php

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
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

        $middleware->redirectUsersTo(fn (Request $request) => route('frontend.app.dashboard.index'));
        $middleware->redirectGuestsTo(fn (Request $request) => route('frontend.auth.login'));
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->withSchedule(function () {
        //
    })->create();
