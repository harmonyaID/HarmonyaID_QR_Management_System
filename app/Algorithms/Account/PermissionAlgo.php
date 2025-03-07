<?php

namespace App\Algorithms\Account;

use App\Jobs\Account\CachePermissionJob;
use App\Models\Account\Permission;
use App\Models\Account\Role;
use App\Services\Constant\Activity\ActivityAction;
use App\Services\Constant\Global\QueueType;
use Illuminate\Support\Facades\DB;

class PermissionAlgo
{
    public function __construct(public ?Permission $permission = null)
    {
    }

    public function assign(Role $role)
    {
        try {
            
            DB::transaction(function () use ($role) {
                if ($role->id == Role::getSuperadminId()) {
                    errUnauthorized();
                }
    
                $this->permission->assignRole($role);

                $role->setAction(ActivityAction::UPDATE)
                    ->saveActivity('Assign permission ' . $this->permission->name . ' to ' . $role->name);
    
            });

            CachePermissionJob::dispatch($role->id)
                ->delay(now()->addSeconds(10));

            return success();

        } catch (\Throwable $th) {
            exception($th);
        }
    }

    public function unassign(Role $role)
    {
        try {
            
            DB::transaction(function () use ($role) {
                if ($role->id == Role::getSuperadminId()) {
                    errUnauthorized();
                }
    
                $this->permission->unassignRole($role);

                $role->setAction(ActivityAction::UPDATE)
                    ->saveActivity('Unassign permission ' . $this->permission->name . ' from ' . $role->name);
    
            });

            CachePermissionJob::dispatch($role->id)
                ->delay(now()->addSeconds(10));

            return success();

        } catch (\Throwable $th) {
            exception($th);
        }
    }
}