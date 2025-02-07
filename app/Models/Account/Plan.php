<?php

namespace App\Models\Account;

use App\Models\Account\Traits\HasActivityPlanProperty;
use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class Plan extends BaseModel
{
    use HasActivityPlanProperty;

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


    // Scopes

    public function scopeFilter ($query, Request $request)
    {
        if ($this->hasSearch($request)) {
            $query->where('name', 'ILIKE', "%{$request->search}%");
        }

        return $query;
    }


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
