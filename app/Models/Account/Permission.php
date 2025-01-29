<?php

namespace App\Models\Account;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Permission extends BaseModel
{
    // protected $table = '';
    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT => 'datetime',
        self::UPDATED_AT => 'datetime',
        self::DELETED_AT => 'datetime'
    ];


    // Relationships

    public function roles() : BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'role_has_permissions', 'permissionId', 'roleId');
    }
}
