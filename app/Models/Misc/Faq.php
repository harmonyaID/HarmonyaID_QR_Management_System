<?php

namespace App\Models\Misc;

use App\Models\Account\User;
use App\Models\BaseModel;
use App\Models\Misc\Traits\HasActivityFaqProperty;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;

class Faq extends BaseModel
{
    use HasActivityFaqProperty;

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
            $query->where('question', 'ilike', "%{$request->search}%");
        }

        if ($this->hasCreatedAt($request)) {
            $from = Carbon::createFromFormat('d F Y', $request->createdFrom)->startOfDay();
            $to = Carbon::createFromFormat('d F Y', $request->createdTo)->endOfDay();

            $query->whereBetween('createdAt', [$from, $to]);
        }

        return $query;
    }


    // Relationships

    public function creator() : BelongsTo
    {
        return $this->belongsTo(User::class, 'createdBy');
    }

}
