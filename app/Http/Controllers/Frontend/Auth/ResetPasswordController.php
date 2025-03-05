<?php

namespace App\Http\Controllers\Frontend\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResetPasswordController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('auth/ResetPassword', [
            'token' => $request->string('token'),
            'email' => $request->string('email'),
        ]);
    }
}
