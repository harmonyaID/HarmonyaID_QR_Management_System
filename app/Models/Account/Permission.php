<?php

namespace App\Models\Account;

use App\Models\BaseModel;
use App\Services\Constant\Global\CacheKey;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class Permission extends BaseModel
{
    // protected $table = '';
    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT => 'datetime',
        self::UPDATED_AT => 'datetime',
        self::DELETED_AT => 'datetime'
    ];

    
    // Scopes

    public function scopeHasRole ($query, Request $request)
    {
        if (empty($request->roleId)) {
            $query->whereNull('name');
            return $query;
        }

        $query->leftJoin('role_has_permissions', function ($join) use ($request) {
            $join->on('permissions.id', '=', 'role_has_permissions.permissionId')
                ->where('roleId', $request->roleId);
        });

        return $query;
    }

    public function scopeOfCode ($query, string $code)
    {
        return $query->where('code', $code);
    }


    // Relationships

    public function roles() : BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_has_permissions', 'permissionId', 'roleId');
    }


    // Functions

    public function assignRole(Role|string $roleId)
    {
        $role = $roleId;
        if (is_string($role)) {
            $role = Role::find($role);
        }
        
        if (!$role) {
            errNotFound(Role::class);
        }

        DB::table('role_has_permissions')->upsert([
            'roleId'        => $role->id,
            'permissionId'  => $this->id,
        ], ['roleId', 'permissionId']);
    }

    public function unassignRole(Role|string $roleId)
    {
        $role = $roleId;
        if (is_string($role)) {
            $role = Role::find($role);
        }
        
        if (!$role) {
            errNotFound(Role::class);
        }

        DB::table('role_has_permissions')
            ->where('roleId', $role->id)
            ->where('permissionId', $this->id)
            ->delete();
    }

    public static function cachePermissions(Role|string $role)
    {
        $roleId = $role;
        if ($role instanceof Role) {
            $roleId = $role->id;
        }

        static::clearPermissionsCache($roleId);

        $permissions = DB::table('role_has_permissions', 'mapping')
            ->join('permissions', 'mapping.permissionId', '=', 'permissions.id')
            ->where('roleId', $roleId)
            ->pluck('permissions.code')
            ->toArray();

        $key = CacheKey::permissions($roleId);

        Cache::forever($key, $permissions);

        return $permissions;
    }

    public static function clearPermissionsCache(Role|string $role)
    {
        $roleId = $role;
        if ($role instanceof Role) {
            $roleId = $role->id;
        }

        $key = CacheKey::permissions($roleId);
        if (Cache::has($key)) {
            Cache::forget($key);
        }
    }

    public static function getUserPermissions()
    {
        $user = auth_user();
        if (!$user) {
            return [];
        }

        $roleId = $user->roleId;
        $key = CacheKey::permissions($roleId);

        if (Cache::has($key)) {
            return Cache::get($key);
        }

        return static::cachePermissions($roleId);
    }
}
