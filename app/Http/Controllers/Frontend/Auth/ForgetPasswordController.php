<?php

namespace App\Http\Controllers\Frontend\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ForgetPasswordController extends Controller
{
    public function index()
    {
        return Inertia::render('auth/ForgetPassword');
    }
}
