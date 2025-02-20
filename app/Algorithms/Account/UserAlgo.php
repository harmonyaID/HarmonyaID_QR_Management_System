<?php

namespace App\Algorithms\Account;

use App\Models\Account\Role;
use App\Models\Account\User;
use App\Services\Constant\Activity\ActivityAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserAlgo
{
    public function __construct(public ?User $user = null)
    {
    }

    public function create(Request $request)
    {
        try {
            
            DB::transaction(function () use ($request) {

                $emailUsed = User::where('email', $request->email)->exists();
                if ($emailUsed) {
                    errInvalid('This email is being used by another user');
                }

                $role = Role::find($request->roleId);
                if (empty($role)) {
                    errNotFound(Role::class);
                }

                $password = 'KyuAr-Kodeh#123';
                if (!empty($request->password)) {
                    $password = $request->password;
                }

                $this->user = User::create([
                    ...$request->validated(),
                    'deletable' => true,
                    'password'  => Hash::make($password),
                ]);

                $this->user->setActivityPropertyAttributes(ActivityAction::CREATE)
                    ->saveActivity('New user created: ' . $this->user->fullname . '[' . $this->user->id . ']');

            });

            return success($this->user);
            
        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function update(Request $request)
    {
        try {
            
            DB::transaction(function () use ($request) {

                $emailUsed = User::where('email', $request->email)
                    ->where('id', '!=', $this->user->id)
                    ->exists();
                if ($emailUsed) {
                    errInvalid('This email is being used by another user');
                }

                $role = Role::find($request->roleId);
                if (empty($role)) {
                    errNotFound(Role::class);
                }

                $this->user->setOldActivityPropertyAttributes(ActivityAction::UPDATE);

                $this->user->update([
                    ...$request->validated(),
                ]);

                $this->user->setActivityPropertyAttributes(ActivityAction::UPDATE)
                    ->saveActivity('User ' . $this->user->fullname . '[' . $this->user->id . '] updated');

            });

            return success($this->user);
            
        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function delete()
    {
        try {
            
            DB::transaction(function () {

                $this->user->setOldActivityPropertyAttributes(ActivityAction::DELETE);

                $this->user->delete();

                $this->user->setActivityPropertyAttributes(ActivityAction::DELETE)
                    ->saveActivity('User ' . $this->user->fullname . '[' . $this->user->id . '] deleted');

            });

            return success($this->user);
            
        } catch (\Throwable $th) {
            exception($th);
        }
    }
}