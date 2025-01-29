<?php

namespace App\Models\Bill;

use App\Models\BaseModel;
use App\Services\Constant\Bill\PaymentMethod;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Payment extends BaseModel
{
    // protected $table = '';
    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT    => 'datetime',
        self::UPDATED_AT    => 'datetime',
        self::DELETED_AT    => 'datetime',
        'amount'            => 'decimal:2',
        'paidAt'            => 'datetime',
    ];

    protected $appends = [
        'paymentMethod',
    ];


    // Relationships
    public function bill() : BelongsTo
    {
        return $this->belongsTo(Bill::class, 'billId');
    }


    // Accessors

    protected function paymentMethod() : Attribute
    {
        return Attribute::make(
            get: function (mixed $value, array $attributes) {
                return PaymentMethod::idName($attributes['paymentMethodId']);
            }
        );
    }
}
