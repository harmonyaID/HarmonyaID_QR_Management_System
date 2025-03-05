<?php

use App\Http\Controllers\Web\Account\PermissionController;
use App\Http\Controllers\Web\Account\PlanController;
use App\Http\Controllers\Web\Account\RoleController;
use App\Http\Controllers\Web\Account\UsageCategoryController;
use App\Http\Controllers\Web\Account\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('accounts')
    ->as('accounts.')
    ->group(function () {

        Route::prefix('users')
            ->as('users.')
            ->group(function () {

                Route::get('/', [UserController::class, 'get'])->name('get');
                Route::post('/', [UserController::class, 'create'])->name('create');
                Route::put('{id}', [UserController::class, 'update'])->name('update');
                Route::delete('{id}', [UserController::class, 'delete'])->name('delete');

            });

        Route::prefix('roles')
            ->as('roles.')
            ->group(function () {

                Route::get('/', [RoleController::class, 'get'])->name('get');
                Route::post('/', [RoleController::class, 'create'])->name('create');
                Route::put('{id}', [RoleController::class, 'update'])->name('update');
                Route::delete('{id}', [RoleController::class, 'delete'])->name('delete');

            });

        Route::prefix('permissions')
            ->as('permissions.')
            ->group(function () {

                Route::get('/', [PermissionController::class, 'get'])->name('get');
                Route::put('{id}/assign/{roleId}', [PermissionController::class, 'assign'])->name('assign');
                Route::put('{id}/unassign/{roleId}', [PermissionController::class, 'unassign'])->name('unassign');

            });

        Route::prefix('plans')
            ->as('plans.')
            ->group(function () {

                Route::get('/', [PlanController::class, 'get'])->name('get');
                Route::post('/', [PlanController::class, 'create'])->name('create');
                Route::put('{id}', [PlanController::class, 'update'])->name('update');
                Route::delete('{id}', [PlanController::class, 'delete'])->name('delete');

            });

        Route::prefix('usage-categories')
            ->as('usage-categories.')
            ->group(function () {

                Route::get('my-category', [UsageCategoryController::class, 'getCurrent'])->name('my-category');

                Route::get('/', [UsageCategoryController::class, 'get'])->name('get');
                Route::post('/', [UsageCategoryController::class, 'create'])->name('create');
                Route::put('{id}', [UsageCategoryController::class, 'update'])->name('update');
                Route::delete('{id}', [UsageCategoryController::class, 'delete'])->name('delete');
                
                Route::post('{id}/select', [UsageCategoryController::class, 'select'])->name('select');

            });

    });