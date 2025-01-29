<?php

namespace App\Models\Account;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Role extends BaseModel
{
    // protected $table = '';
    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT => 'datetime',
        self::UPDATED_AT => 'datetime',
        self::DELETED_AT => 'datetime'
    ];


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
