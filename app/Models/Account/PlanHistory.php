<?php

namespace App\Models\Account;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PlanHistory extends BaseModel
{
    // protected $table = '';
    protected $guarded = ['id'];

    public $timestamps = false;

    protected $casts = [
        'startedAt' => 'datetime',
        'endedAt'   => 'datetime',
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
}
