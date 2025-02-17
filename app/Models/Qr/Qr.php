<?php

namespace App\Models\Qr;

use App\Models\Account\User;
use App\Models\BaseModel;
use App\Models\Qr\Traits\CanGenerateQr;
use App\Models\Qr\Traits\HasActivityQrProperty;
use App\Models\Scopes\Qr\QrOwnerScope;
use App\Services\Constant\Qr\QrDataType;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use libphonenumber\PhoneNumberFormat;

#[ScopedBy([QrOwnerScope::class])]
class Qr extends BaseModel
{
    use HasActivityQrProperty;
    use CanGenerateQr;
    
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
        'phone',
        'version'
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

    public function type() : BelongsTo
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

    protected function phone() : Attribute
    {
        return Attribute::make(
            get: function (mixed $value, array $attributes) {
                if ($attributes['dataTypeId'] != QrDataType::WHATSAPP_ID) {
                    return '';
                }

                $data = json_decode($attributes['data'], true);

                return format_phone(
                    $data['phone']['country'], 
                    $data['phone']['number'], 
                    PhoneNumberFormat::INTERNATIONAL
                );
            }
        );
    }

    protected function version() : Attribute
    {
        return Attribute::make(
            get: function (mixed $value, array $attributes) {
                return strtotime($attributes['updatedAt']);
            }
        );
    }
}
