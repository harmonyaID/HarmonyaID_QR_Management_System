<?php

namespace App\Services\Constant\Global;

use App\Services\Constant\BaseCodeName;

class CacheKey extends BaseCodeName
{
    const PERMISSION = 'role-ability';
    const SUPERADMIN_ROLE = 'role-super';

    public static function permissions(string $roleId) : string
    {
        return static::PERMISSION . '-' . $roleId;
    }
}
