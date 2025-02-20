<?php

namespace App\Models\Account;

use App\Models\Account\Traits\HasActivityUserProperty;
use App\Models\BaseAuthenticatable;
use App\Models\Qr\Qr;
use App\Notifications\Auth\ResetPasswordNotification;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Notifications\Notifiable;

class User extends BaseAuthenticatable
{
    use HasActivityUserProperty;
    use Notifiable;

    protected $guarded = ['id'];

    protected $casts = [
        self::CREATED_AT    => 'datetime',
        self::UPDATED_AT    => 'datetime',
        self::DELETED_AT    => 'datetime',
        'emailVerifiedAt'   => 'datetime',
        'deletable'         => 'boolean',
    ];

    protected $hidden = [
        'password',
        'rememberToken',
        'emailVerifiedAt',
        'googleId',
        'googleToken',
        'googleExpiredAt',
        'microsoftId',
        'microsoftToken',
        'microsoftExpiredAt',
    ];

    protected $appends = [
        'fullname',
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

    public function role() : BelongsTo
    {
        return $this->belongsTo(Role::class, 'roleId');
    }

    public function plan() : BelongsTo
    {
        return $this->belongsTo(Plan::class, 'planId');
    }

    public function usageCategory() : BelongsTo
    {
        return $this->belongsTo(UsageCategory::class, 'usageCategoryId');
    }

    public function qrCodes() : HasMany
    {
        return $this->hasMany(Qr::class, 'createdBy');
    }

    
    // Accessors

    protected function fullname() : Attribute
    {
        return Attribute::make(
            get: function (mixed $value, array $attributes) {
                return ucwords($attributes['firstname'] . ' ' . $attributes['lastname']);
            }
        );
    }


    // Overrides

    public function sendPasswordResetNotification($token): void
    {
        $this->notify(new ResetPasswordNotification($token, $this->email));
    }
}
