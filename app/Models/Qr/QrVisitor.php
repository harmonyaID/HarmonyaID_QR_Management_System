<?php

namespace App\Models\Qr;

use App\Models\Account\User;
use App\Models\BaseModel;
use App\Models\Qr\Traits\HasActivityQrVisitorProperty;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QrVisitor extends BaseModel
{
    use HasActivityQrVisitorProperty;

    // protected $table = '';
    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT => 'datetime',
        self::UPDATED_AT => 'datetime',
        self::DELETED_AT => 'datetime'
    ];


    // Relationships

    public function qr() : BelongsTo
    {
        return $this->belongsTo(Qr::class, 'qrId');
    }

    public function qrOwner() : BelongsTo
    {
        return $this->belongsTo(User::class, 'qrOwnedBy');
    }
}
