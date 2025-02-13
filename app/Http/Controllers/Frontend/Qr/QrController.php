<?php

namespace App\Http\Controllers\Frontend\Qr;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QrController extends Controller
{
    public function create()
    {
        return Inertia::render('app/qr/QrCreate');
    }
}
