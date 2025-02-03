<?php

namespace App\Algorithms\Auth;

use App\Models\Account\User;
use App\Services\Constant\Activity\ActivityAction;
use Illuminate\Auth\Events\Lockout;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Str;

class AuthenticationAlgo
{
    private $throttleKey;

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse|mixed|void
     */
    public function login(Request $request)
    {
        try {
            
            $this->setThrottleKey($request);

            if (!$this->ensureNotRateLimited()) {
                event(new Lockout($request));
                errInvalid("Too many attempts, please try again later");
            }

            if (!Auth::guard('web')->attempt($request->only('email', 'password'), $request->boolean('remember'))) {
                RateLimiter::hit($this->throttleKey);
                errCredentialIncorrect("Please check your email or password!!");
            }

            $user = Auth::user();
            if (!$user) {
                RateLimiter::hit($this->throttleKey);
                Auth::logout();
                errUnauthenticated("Unable to get the user data");
            }

            return success();
            
        } catch (\Throwable $th) {
            exception($th);
        }
    }

    /**
     * @return \Illuminate\Http\JsonResponse|mixed|void
     */
    public function logout()
    {
        try {

            $user = Auth::guard('web')->user();
            if (!$user) {
                errUnauthenticated("User not found");
            }

            Auth::logout();

            return success();

        } catch (\Throwable $exception) {
            exception($exception);
        }
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse|mixed|void
     */
    public function register(Request $request)
    {
        try {
            
            DB::transaction(function () use ($request) {

                $emailUsed = User::where('email', $request->email)->exists();
                if ($emailUsed) {
                    errInvalid('This email is being used by another user');
                }

                /** @var User */
                $user = User::create([
                    ...$request->validated(),
                    'password'  => Hash::make($request->password),
                ]);

                $user->setActivityPropertyAttributes(ActivityAction::CREATE)
                    ->saveActivity('New user registered: ' . $user->fullname . '[' . $user->id . ']');

            });

            return success(message: 'Successfully registered, please sign in using your credentials');
            
        } catch (\Throwable $th) {
            exception($th);
        }
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse|mixed|void
     */
    public function forgotPassword(Request $request)
    {
        $status = Password::sendResetLink($request->only('email'));
        if ($status == Password::RESET_LINK_SENT) {
            return success(message: "Password reset successfully sent, please check your email");
        }

        return errCredentialIncorrect("Invalid email");
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\JsonResponse|mixed|void
     */
    public function resetPassword(Request $request)
    {
        $status = Password::reset(
            $request->only('email', 'password', 'passwordConfirmation', 'token'),
            function ($user) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($request->password),
                    'rememberToken' => Str::random(60),
                ])->save();

                event(new PasswordReset($user));
            }
        );

        if ($status == Password::PASSWORD_RESET) {
            return success(message: "Password successfully updated");
        }

        return errCredentialIncorrect("Invalid email");
    }


    // Private functions 

    private function setThrottleKey(Request $request)
    {
        $this->throttleKey = Str::transliterate(Str::lower($request->string('email') . '|' . $request->ip()));
    }

    private function ensureNotRateLimited()
    {
        return !RateLimiter::tooManyAttempts($this->throttleKey, 5);
    }
}
