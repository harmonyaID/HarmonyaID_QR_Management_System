<?php

namespace App\Algorithms\Auth;

use App\Models\Account\Role;
use App\Models\Account\User;
use App\Services\Constant\Activity\ActivityAction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;

class GoogleAlgo
{
    private $newUser = false;

    public function handle()
    {
        try {
            DB::transaction(function () {
                
                $googleUser = Socialite::driver('google')->user();

                $email  = $googleUser->getEmail();
                $id     = $googleUser->getId();

                /** @var User | null */
                $user = User::where('email', $email)
                    ->first();
                if (empty($user)) {
                    $user = $this->register($googleUser->getName(), $email, $id);
                    $this->newUser = true;
                }

                if ($user->googleId != $id)  {
                    errInvalid('Something went wrong');
                }

                $user->update([
                    'googleToken' => $googleUser->token,
                    'googleExpiredAt' => now()->addSeconds($googleUser->expiresIn),
                ]);
                
                Auth::guard('web')->login($user, true);

            });

            $route = 'frontend.app.dashboard.index';
            if ($this->newUser) {
                $route = 'frontend.setup.usage-category';
            }

            return redirect()->route($route);

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    private function register($name, $email, $googleId)
    {
        $role = Role::where('name', 'User')->where('deletable', false)->first();
        if (empty($role)) {
            errNotFound(Role::class);
        }

        $separated_name = explode(' ', $name, 2);
        $firstname  = $separated_name[0];
        $lastname   = !empty($separated_name[1]) ? $separated_name[1] : '';

        /** @var User */
        $user = User::create([
            'firstname' => $firstname,
            'lastname'  => $lastname,
            'email'     => $email,
            'password'  => '',
            'roleId'    => $role->id,
            'deletable' => true,
            'googleId'  => $googleId,
        ]);

        $user->setActivityPropertyAttributes(ActivityAction::CREATE)
            ->saveActivity('New user registered via Google: ' . $name . '[' . $user->id . ']');

        return $user;
    }
}