<?php

namespace App\Http\Controllers\Web\Misc;

use App\Algorithms\Misc\FaqAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Misc\FaqRequest;
use App\Models\Misc\Faq;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::FAQS_ALL, PermissionCode::FAQS_CREATE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('create');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::FAQS_ALL, PermissionCode::FAQS_READ)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('get');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::FAQS_ALL, PermissionCode::FAQS_UPDATE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('update');

        $this->middleware(function ($request, $next) {
            if (!has_permissions(PermissionCode::FAQS_ALL, PermissionCode::FAQS_DELETE)) {
                errUnauthorized();
            }

            return $next($request);
        })->only('delete');
    }

    public function get(Request $request)
    {
        $roles = Faq::filter($request)
            ->orderBy('createdAt', 'DESC')
            ->with(['creator'])
            ->getOrPaginate($request, true);

        return success($roles);
    }

    public function create(FaqRequest $request)
    {
        $algo = new FaqAlgo();
        return $algo->create($request);
    }

    public function update(FaqRequest $request, $id)
    {
        $role = Faq::find($id);
        if (empty($role)) {
            errNotFound(Faq::class);
        }

        $algo = new FaqAlgo($role);
        return $algo->update($request);
    }

    public function delete($id)
    {
        $role = Faq::find($id);
        if (empty($role)) {
            errNotFound(Faq::class);
        }

        $algo = new FaqAlgo($role);
        return $algo->delete();
    }
}
