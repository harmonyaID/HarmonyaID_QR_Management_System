<?php

namespace App\Models\Bill;

use App\Models\Account\Plan;
use App\Models\Account\User;
use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bill extends BaseModel
{
    // protected $table = '';
    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT    => 'datetime',
        self::UPDATED_AT    => 'datetime',
        self::DELETED_AT    => 'datetime',
        'dueAt'             => 'datetime',
        'amount'            => 'decimal:2',
        'isPaid'            => 'boolean',
    ];

    
    // Relationships
    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function plan() : BelongsTo
    {
        return $this->belongsTo(Plan::class, 'planId');
    }

    public function payment() : HasMany
    {
        return $this->hasMany(Payment::class, 'billId');
    }
}
