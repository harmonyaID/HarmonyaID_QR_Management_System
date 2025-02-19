<?php

namespace App\Http\Controllers\Web\Account;

use App\Algorithms\Account\PermissionAlgo;
use App\Http\Controllers\Controller;
use App\Models\Account\Permission;
use App\Models\Account\Role;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::PERMISSIONS_ALL, PermissionCode::PERMISSIONS_READ)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('get');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::PERMISSIONS_ALL, PermissionCode::PERMISSIONS_ASSIGN)) {
                errUnauthorized();
            }

            return $next($request);
        })->except('get');
    }

    public function get(Request $request)
    {
        $permissions = Permission::hasRole($request)->get();
        return success($permissions);
    }

    public function assign($id, $roleId)
    {
        $permission = Permission::find($id);
        if (empty($permission)) {
            errNotFound(Permission::class);
        }

        $role = Role::find($roleId);
        if (empty($roleId)) {
            errNotFound(Role::class);
        }

        $algo = new PermissionAlgo($permission);
        return $algo->assign($role);
    }

    public function unassign($id, $roleId)
    {
        $permission = Permission::find($id);
        if (empty($permission)) {
            errNotFound(Permission::class);
        }

        $role = Role::find($roleId);
        if (empty($roleId)) {
            errNotFound(Role::class);
        }

        $algo = new PermissionAlgo($permission);
        return $algo->unassign($role);
    }
}
