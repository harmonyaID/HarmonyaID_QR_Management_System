<?php

namespace App\Http\Controllers\Frontend\Qr;

use App\Http\Controllers\Controller;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QrSettingController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(
                PermissionCode::QR_TYPES_ALL, 
                PermissionCode::QR_TYPES_CREATE,
                PermissionCode::QR_TYPES_READ,
                PermissionCode::QR_TYPES_UPDATE,
                PermissionCode::QR_TYPES_DELETE,
            )) {
                return redirect()->back()->withErrors('Unauthorized');
            }

            return $next($request);
        });
    }

    public function index()
    {
        return Inertia::render('app/qr/QrSetting');
    }
}
