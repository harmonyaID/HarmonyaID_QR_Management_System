<?php

namespace App\Models\Account;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Plan extends BaseModel
{
    // protected $table = '';
    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT    => 'datetime',
        self::UPDATED_AT    => 'datetime',
        self::DELETED_AT    => 'datetime',
        'allowDynamic'      => 'boolean',
        'dynamicQuota'      => 'integer',
        'price'             => 'decimal:2',
    ];


    // Relationships

    public function users() : HasMany
    {
        return $this->hasMany(User::class, 'planId');
    }

    public function creator() : BelongsTo
    {
        return $this->belongsTo(User::class, 'createdBy');
    }
}
