<?php

namespace App\Algorithms\Account;

use App\Models\Account\Role;
use App\Services\Constant\Activity\ActivityAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RoleAlgo
{
    public function __construct(public ?Role $role = null)
    {
    }

    public function create(Request $request)
    {
        try {
            
            DB::transaction(function () use ($request) {

                $this->role = Role::create([
                    ...$request->validated(),
                    'deletable' => true,
                    'createdBy' => Auth::user()->id,
                ]);

                $this->role->setActivityPropertyAttributes(ActivityAction::CREATE)
                    ->saveActivity('Create new role: ' . $this->role->name . '[' . $this->role->id . ']');
            });

            return success($this->role);

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function update(Request $request)
    {
        try {
            
            DB::transaction(function () use ($request) {

                $this->role->setOldActivityPropertyAttributes(ActivityAction::UPDATE);

                $this->role->update($request->validated());

                $this->role->setActivityPropertyAttributes(ActivityAction::UPDATE)
                    ->saveActivity('Update role: ' . $this->role->name . '[' . $this->role->id . ']');
            });

            return success($this->role);

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function delete()
    {
        try {
            
            DB::transaction(function () {

                $this->role->setOldActivityPropertyAttributes(ActivityAction::DELETE);

                $this->role->delete();

                $this->role->setActivityPropertyAttributes(ActivityAction::DELETE)
                    ->saveActivity('Delete role: ' . $this->role->name . '[' . $this->role->id . ']');
            });

            return success($this->role);

        } catch (\Throwable $th) {
            exception($th);
        }
    }
}