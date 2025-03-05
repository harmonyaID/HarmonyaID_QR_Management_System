<?php

namespace App\Models\Account;

use App\Models\Account\Traits\HasActivityUsageCategoryProperty;
use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class UsageCategory extends BaseModel
{
    use HasActivityUsageCategoryProperty;
    
    // protected $table = '';
    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT => 'datetime',
        self::UPDATED_AT => 'datetime',
        self::DELETED_AT => 'datetime'
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
        return $this->hasMany(User::class, 'usageCategoryId');
    }
}
