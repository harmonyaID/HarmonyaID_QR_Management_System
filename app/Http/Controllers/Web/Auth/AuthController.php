<?php

namespace App\Http\Controllers\Web\Auth;

use App\Algorithms\Auth\AuthenticationAlgo;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\ResetPasswordRequest;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * @param LoginRequest $request
     *
     * @return \Illuminate\Http\JsonResponse|mixed|null
     */
    public function login(LoginRequest $request)
    {
        $algo = new AuthenticationAlgo();
        return $algo->login($request);
    }

    /**
     * @return \Illuminate\Http\JsonResponse|mixed|null
     */
    public function logout()
    {
        $algo = new AuthenticationAlgo();
        return $algo->logout();
    }

    /**
     * @return \Illuminate\Http\JsonResponse|mixed|null
     */
    public function register(RegisterRequest $request)
    {
        $algo = new AuthenticationAlgo();
        return $algo->register($request);
    }

    /**
     * @return \Illuminate\Http\JsonResponse|mixed|null
     */
    public function forgotPassword(ForgotPasswordRequest $request)
    {
        $algo = new AuthenticationAlgo();
        return $algo->forgotPassword($request);
    }

    /**
     * @return \Illuminate\Http\JsonResponse|mixed|null
     */
    public function resetPassword(ResetPasswordRequest $request)
    {
        $algo = new AuthenticationAlgo();
        return $algo->resetPassword($request);
    }
}
