<?php

namespace App\Http\Controllers\Frontend\Account;

use App\Http\Controllers\Controller;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function __construct()
    {
        $this->middleware(function ($request, $next) {
            if (!has_permissions(
                PermissionCode::USERS_ALL, 
                PermissionCode::USERS_CREATE,
                PermissionCode::USERS_READ,
                PermissionCode::USERS_UPDATE,
                PermissionCode::USERS_DELETE,
                PermissionCode::ROLES_ALL, 
                PermissionCode::ROLES_CREATE,
                PermissionCode::ROLES_READ,
                PermissionCode::ROLES_UPDATE,
                PermissionCode::ROLES_DELETE,
                PermissionCode::PERMISSIONS_ALL, 
                PermissionCode::PERMISSIONS_READ,
                PermissionCode::PERMISSIONS_ASSIGN,
                PermissionCode::PLANS_ALL, 
                PermissionCode::PLANS_CREATE,
                PermissionCode::PLANS_READ,
                PermissionCode::PLANS_UPDATE,
                PermissionCode::PLANS_DELETE,
                PermissionCode::USAGE_CATEGORIES_ALL, 
                PermissionCode::USAGE_CATEGORIES_CREATE,
                PermissionCode::USAGE_CATEGORIES_READ,
                PermissionCode::USAGE_CATEGORIES_UPDATE,
                PermissionCode::USAGE_CATEGORIES_DELETE,
            )) {
                return redirect()->back()->withErrors('Unauthorized');
            }

            return $next($request);
        });
    }

    public function index()
    {
        return Inertia::render('app/account/AccountSetting');
    }
}
