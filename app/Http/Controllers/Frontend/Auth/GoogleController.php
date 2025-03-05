<?php

namespace App\Http\Controllers\Frontend\Auth;

use App\Algorithms\Auth\GoogleAlgo;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function login()
    {
        return Socialite::driver('google')->redirect();
    }

    public function authenticate()
    {
        $algo = new GoogleAlgo;
        return $algo->handle();
    }
}
