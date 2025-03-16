<?php

namespace App\Http\Controllers\Web\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Account\User;
use App\Models\Qr\Qr;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function get(Request $request)
    {
        $totalQr    = Qr::count();
        $totalUser  = null;
        if (has_permissions(PermissionCode::USERS_ALL, PermissionCode::USERS_READ)) {
            $totalUser = User::count();
        }

        return success([
            'totalQr'   => $totalQr,
            'totalUser' => $totalUser,
        ]);
    }
}
