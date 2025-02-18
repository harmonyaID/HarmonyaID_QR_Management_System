<?php

namespace App\Http\Controllers\Web\Account;

use App\Algorithms\Account\PermissionAlgo;
use App\Http\Controllers\Controller;
use App\Models\Account\Permission;
use App\Models\Account\Role;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
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
