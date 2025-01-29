<?php

namespace App\Models\Account;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UsageCategory extends BaseModel
{
    // protected $table = '';
    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT => 'datetime',
        self::UPDATED_AT => 'datetime',
        self::DELETED_AT => 'datetime'
    ];


    // Relationships

    public function users() : HasMany
    {
        return $this->hasMany(User::class, 'usageCategoryId');
    }
}
