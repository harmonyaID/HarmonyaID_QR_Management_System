<?php

namespace App\Http\Controllers\Web\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Qr\Qr;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function get(Request $request)
    {
        $totalQr = Qr::count();

        return success([
            'totalQr' => $totalQr,
        ]);
    }
}
