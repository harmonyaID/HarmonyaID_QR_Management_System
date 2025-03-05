<?php

namespace App\Http\Controllers\Frontend\Misc;

use App\Http\Controllers\Controller;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FaqController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(
                PermissionCode::FAQS_ALL, 
                PermissionCode::FAQS_CREATE,
                PermissionCode::FAQS_READ,
                PermissionCode::FAQS_UPDATE,
                PermissionCode::FAQS_DELETE,
            )) {
                return redirect()->route('frontend.app.dashboard.index')->withErrors('Unauthorized');
            }

            return $next($request);
        })->only('manage');
    }

    public function index()
    {
        return Inertia::render('app/help/Faq');
    }

    public function manage()
    {
        return Inertia::render('app/help/ManageFaq');
    }
}
