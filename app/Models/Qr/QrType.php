<?php

namespace App\Models\Qr;

use App\Models\Account\User;
use App\Models\BaseModel;
use App\Models\Qr\Traits\HasActivityQrTypeProperty;
use App\Services\Constant\Qr\QrDataType;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class QrType extends BaseModel
{
    use HasActivityQrTypeProperty;

    // protected $table = '';
    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT => 'datetime',
        self::UPDATED_AT => 'datetime',
        self::DELETED_AT => 'datetime',
        'isDynamic' => 'boolean',
    ];

    protected $appends = [
        'dataType',
    ];


    // Scopes

    public function scopeFilter($query, Request $request)
    {
        if ($this->hasSearch($request)) {
            $query->where('name', 'ILIKE', "%{$request->search}%");
        }

        if (isset($request->isDynamic)) {
            $query->where('isDynamic', $request->isDynamic);
        }

        return $query;
    }


    // Relationships

    public function qrs() : HasMany
    {
        return $this->hasMany(Qr::class, 'qrTypeId');
    }

    public function creator() : BelongsTo
    {
        return $this->belongsTo(User::class, 'createdBy');
    }


    // Accessors

    protected function getDataTypeAttribute()
    {
        return QrDataType::idName($this->dataTypeId);
    }

    protected function dataType() : Attribute
    {
        return Attribute::make(
            get: function (mixed $value, array $attributes) {
                return QrDataType::idName($attributes['dataTypeId']);
            }
        );
    }
}
