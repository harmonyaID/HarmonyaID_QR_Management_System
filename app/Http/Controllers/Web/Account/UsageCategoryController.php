<?php

namespace App\Http\Controllers\Web\Account;

use App\Algorithms\Account\UsageCategoryAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Account\CreateUsageCategoryRequest;
use App\Http\Requests\Account\UpdateUsageCategoryRequest;
use App\Models\Account\UsageCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UsageCategoryController extends Controller
{
    public function get(Request $request)
    {
        $usageCategories = UsageCategory::filter($request)->getOrPaginate($request, true);

        return success($usageCategories->toArray());
    }

    public function getCurrent()
    {
        $category = Auth::user()->usageCategory;

        return success($category?->toArray());
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
