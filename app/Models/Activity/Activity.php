<?php

namespace App\Models\Activity;

use App\Models\BaseModel;
use App\Services\Constant\Account\PermissionCode;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Activity extends BaseModel
{
    protected $table = 'activities';
    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT => 'datetime',
        self::UPDATED_AT => 'datetime',
        self::DELETED_AT => 'datetime',
        'properties' => 'array',
    ];


    /** RELATIONSHIPS */

    public function referable(): MorphTo
    {
        return $this->morphTo('referable', 'referenceType', 'reference');
    }


    /** --- SCOPES --- */

    public function scopeFilter($query, $request)
    {
        if (!empty($request->type)) {
            $query->where(function ($query) use ($request) {
                $query->where('type', $request->type)
                    ->orWhere('type', $request->type);
            });
        }

        if ($request->action != '') {
            $query->where('action', $request->action);
        }

        if ($this->hasSearch($request)) {
            $query->where(function ($query) use ($request) {
                $query->where('description', 'LIKE', "%$request->search%")
                    ->orWhere('causedByName', 'LIKE', "%$request->search%");
            });
        }

        if ($this->hasCreatedAt($request)) {
            $from = Carbon::createFromFormat('d F Y', $request->createdFrom)->startOfDay();
            $to = Carbon::createFromFormat('d F Y', $request->createdTo)->endOfDay();

            $query->whereBetween('createdAt', [$from, $to]);
        }

        if (!has_permissions(PermissionCode::ACTIVITIES_READ_ALL)) {
            $query->where('causedBy', auth_user()->id);
        }
    }

}
