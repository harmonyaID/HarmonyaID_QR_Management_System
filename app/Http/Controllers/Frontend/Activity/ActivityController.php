<?php

namespace App\Http\Controllers\Frontend\Activity;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityController extends Controller
{
    public function index()
    {
        return Inertia::render('app/activity/Activity');
    }
}
