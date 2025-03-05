<?php

namespace App\Http\Controllers\Frontend\Setup;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UsageCategorySetupController extends Controller
{
    public function index()
    {
        return Inertia::render('setup/UsageCategory');
    }
}
