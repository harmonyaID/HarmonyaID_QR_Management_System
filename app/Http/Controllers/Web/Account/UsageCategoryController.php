<?php

namespace App\Http\Controllers\Web\Account;

use App\Algorithms\Account\UsageCategoryAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\CreateUsageCategoryRequest;
use App\Http\Requests\Account\UpdateUsageCategoryRequest;
use App\Models\Account\UsageCategory;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsageCategoryController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::USAGE_CATEGORIES_ALL, PermissionCode::USAGE_CATEGORIES_CREATE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('create');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::USAGE_CATEGORIES_ALL, PermissionCode::USAGE_CATEGORIES_UPDATE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('update');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::USAGE_CATEGORIES_ALL, PermissionCode::USAGE_CATEGORIES_DELETE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('delete');
    }

    public function get(Request $request)
    {
        $usageCategories = UsageCategory::filter($request)->getOrPaginate($request, true);

        return success($usageCategories);
    }

    public function getCurrent()
    {
        $category = Auth::user()->usageCategory;

        return success($category);
    }

    public function create(CreateUsageCategoryRequest $request)
    {
        $algo = new UsageCategoryAlgo;
        return $algo->create($request);
    }

    public function update(UpdateUsageCategoryRequest $request, $id)
    {
        $usageCategory = UsageCategory::find($id);
        if (empty($usageCategory)) {
            errNotFound(UsageCategory::class);
        }

        $algo = new UsageCategoryAlgo($usageCategory);
        return $algo->update($request);
    }

    public function delete($id)
    {
        $usageCategory = UsageCategory::find($id);
        if (empty($usageCategory)) {
            errNotFound(UsageCategory::class);
        }

        $algo = new UsageCategoryAlgo($usageCategory);
        return $algo->delete();
    }

    public function select($id)
    {
        $usageCategory = UsageCategory::find($id);
        if (empty($usageCategory)) {
            errNotFound(UsageCategory::class);
        }

        $algo = new UsageCategoryAlgo($usageCategory);
        return $algo->select();
    }
}
