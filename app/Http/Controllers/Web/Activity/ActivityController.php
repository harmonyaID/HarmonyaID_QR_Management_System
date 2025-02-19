<?php

namespace App\Http\Controllers\Web\Activity;

use App\Http\Controllers\Controller;
use App\Models\Activity\Activity;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::ACTIVITIES_READ)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('get');
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function get(Request $request)
    {
        $activities = Activity::filter($request)->getOrPaginate($request, true);
        return success($activities);
    }
}
