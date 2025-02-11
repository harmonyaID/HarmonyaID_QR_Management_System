<?php

namespace App\Http\Controllers\Frontend\Qr;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QrSettingController extends Controller
{
    public function index()
    {
        return Inertia::render('app/qr/QrSetting');
    }
}
