<?php

namespace App\Models\Qr;

use App\Models\Account\User;
use App\Models\BaseModel;
use App\Models\Qr\Traits\HasActivityQrProperty;
use App\Services\Constant\Qr\QrDataType;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;

class Qr extends BaseModel
{
    use HasActivityQrProperty;
    
    // protected $table = '';
    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT => 'datetime',
        self::UPDATED_AT => 'datetime',
        self::DELETED_AT => 'datetime',
        'data'          => 'array',
        'styles'        => 'array',
        'isDynamic'     => 'boolean',
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

        return $query;
    }


    // Relationships

    public function qrType() : BelongsTo
    {
        return $this->belongsTo(QrType::class, 'qrTypeId');
    }

    public function creator() : BelongsTo
    {
        return $this->belongsTo(User::class, 'createdBy');
    }

    public function visitors() : HasMany
    {
        return $this->hasMany(QrVisitor::class, 'qrId');
    }


    // Accessors

    protected function dataType() : Attribute
    {
        return Attribute::make(
            get: function (mixed $value, array $attributes) {
                return QrDataType::idName($attributes['dataTypeId']);
            }
        );
    }
}
