<?php

namespace App\Http\Controllers\Web\Activity;

use App\Http\Controllers\Controller;
use App\Models\Activity\Activity;
use App\Services\Constant\Account\PermissionCode;
use App\Services\Constant\Activity\ActivityType;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function get(Request $request)
    {
        $activities = Activity::filter($request)
            ->orderBy('createdAt', 'DESC')
            ->getOrPaginate($request, true);
        return success($activities);
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse|mixed
     */
    public function getTypes(Request $request)
    {
        $types = ActivityType::getTypes($request);

        return success($types);
    }


}
