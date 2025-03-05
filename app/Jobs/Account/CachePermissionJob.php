<?php

namespace App\Jobs\Account;

use App\Models\Account\Permission;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class CachePermissionJob implements ShouldQueue, ShouldBeUnique
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(private string $roleId)
    {
    }

    public function uniqueId(): string
    {
        return $this->roleId;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Permission::cachePermissions($this->roleId);
    }
}
