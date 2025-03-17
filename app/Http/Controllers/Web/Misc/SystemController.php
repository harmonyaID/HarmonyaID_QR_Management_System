<?php

namespace App\Http\Controllers\Web\Misc;

use App\Algorithms\Misc\SystemAlgo;
use App\Http\Controllers\Controller;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Http\Request;

class SystemController extends Controller
{
    public function __construct()
    {
        $this->middleware(function (Request $request, $next) {
            if (!has_permissions(PermissionCode::SYSTEM_ALL)) {
                errUnauthorized();
            }

            return $next($request);
        });
    }

    public function get()
    {
        $algo = new SystemAlgo;
        return $algo->get();
    }

    public function getPackage()
    {
        $algo = new SystemAlgo;
        return $algo->getPackage();
    }

    public function getSize()
    {
        $algo = new SystemAlgo;
        return $algo->getSize();
    }
}
