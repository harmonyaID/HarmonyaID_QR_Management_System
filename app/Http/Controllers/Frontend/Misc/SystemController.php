<?php

namespace App\Http\Controllers\Frontend\Misc;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SystemController extends Controller
{
    public function index()
    {
        return Inertia::render('app/misc/System');
    }
}
