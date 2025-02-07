<?php

namespace App\Http\Controllers\Frontend\Account;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('app/account/AccountSetting');
    }
}
