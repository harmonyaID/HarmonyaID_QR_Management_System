<?php

namespace App\Http\Controllers\Web\Account;

use App\Algorithms\Account\RoleAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\RoleRequest;
use App\Models\Account\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
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
