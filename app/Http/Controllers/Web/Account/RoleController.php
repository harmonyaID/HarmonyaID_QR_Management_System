<?php

namespace App\Http\Controllers\Web\Account;

use App\Algorithms\Account\RoleAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\RoleRequest;
use App\Models\Account\Role;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::ROLES_ALL, PermissionCode::ROLES_CREATE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('create');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::ROLES_ALL, PermissionCode::ROLES_READ)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('get');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::ROLES_ALL, PermissionCode::ROLES_UPDATE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('update');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::ROLES_ALL, PermissionCode::ROLES_DELETE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('delete');
    }

    public function get(Request $request)
    {
        $plan = Role::filter($request)->getOrPaginate($request, true);

        return success($plan);
    }

    public function create(RoleRequest $request)
    {
        $algo = new RoleAlgo;
        return $algo->create($request);
    }

    public function update(RoleRequest $request, $id)
    {
        $plan = Role::find($id);
        if (empty($plan)) {
            errNotFound(Role::class);
        }

        $algo = new RoleAlgo($plan);
        return $algo->update($request);
    }

    public function delete($id)
    {
        $plan = Role::find($id);
        if (empty($plan)) {
            errNotFound(Role::class);
        }

        $algo = new RoleAlgo($plan);
        return $algo->delete();
    }
}
