<?php

namespace App\Models\Account;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class User extends BaseModel
{
    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT    => 'datetime',
        self::UPDATED_AT    => 'datetime',
        self::DELETED_AT    => 'datetime',
        'emailVerifiedAt'   => 'datetime',
    ];

    protected $appends = [
        'fullName',
    ];


    // Relationships

    public function role() : BelongsTo
    {
        return $this->belongsTo(Role::class, 'roleId');
    }

    public function plan() : BelongsTo
    {
        return $this->belongsTo(Plan::class, 'planId');
    }

    public function usageCategory() : BelongsTo
    {
        return $this->belongsTo(UsageCategory::class, 'usageCategoryId');
    }

    // Accessors

    protected function fullName() : Attribute
    {
        return Attribute::make(
            get: function (mixed $value, array $attributes) {
                return ucwords($attributes['firstName'] . ' ' . $attributes['lastName']);
            }
        );
    }
}
