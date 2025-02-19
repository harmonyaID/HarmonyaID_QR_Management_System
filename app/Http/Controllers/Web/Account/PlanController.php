<?php

namespace App\Http\Controllers\Web\Account;

use App\Algorithms\Account\PlanAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\PlanRequest;
use App\Models\Account\Plan;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Http\Request;

class PlanController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::PLANS_ALL, PermissionCode::PLANS_CREATE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('create');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::PLANS_ALL, PermissionCode::PLANS_READ)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('read');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::PLANS_ALL, PermissionCode::PLANS_UPDATE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('update');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::PLANS_ALL, PermissionCode::PLANS_DELETE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('delete');
    }

    public function get(Request $request)
    {
        $plan = Plan::filter($request)->getOrPaginate($request, true);

        return success($plan);
    }

    public function create(PlanRequest $request)
    {
        $algo = new PlanAlgo;
        return $algo->create($request);
    }

    public function update(PlanRequest $request, $id)
    {
        $plan = Plan::find($id);
        if (empty($plan)) {
            errNotFound(Plan::class);
        }

        $algo = new PlanAlgo($plan);
        return $algo->update($request);
    }

    public function delete($id)
    {
        $plan = Plan::find($id);
        if (empty($plan)) {
            errNotFound(Plan::class);
        }

        $algo = new PlanAlgo($plan);
        return $algo->delete();
    }
}
