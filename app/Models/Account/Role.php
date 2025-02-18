<?php

namespace App\Models\Account;

use App\Models\Account\Traits\HasActivityRoleProperty;
use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class Role extends BaseModel
{
    use HasActivityRoleProperty;

    // protected $table = '';
    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT => 'datetime',
        self::UPDATED_AT => 'datetime',
        self::DELETED_AT => 'datetime'
    ];


    // Scopes

    public function scopeFilter($query, Request $request)
    {
        if ($this->hasSearch($request)) {
            $query->where('name', 'ILIKE', "%{$request->search}%");
        }

        return $query;
    }


    // Relationships

    public function permissions() : BelongsToMany
    {
        return $this->belongsToMany(Permission::class, 'role_has_permissions', 'roleId', 'permissionId');
    }

    public function users() : HasMany
    {
        return $this->hasMany(User::class, 'roleId');
    }

    public function creator() : BelongsTo
    {
        return $this->belongsTo(User::class, 'createdBy');
    }
}
