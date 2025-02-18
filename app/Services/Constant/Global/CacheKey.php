<?php

namespace App\Services\Constant\Global;

use App\Services\Constant\BaseCodeName;

class CacheKey extends BaseCodeName
{
    const PERMISSION = 'role-ability';

    const OPTION = [
        self::PERMISSION,
    ];

    public static function permissions(string $roleId) : string
    {
        return static::PERMISSION . '-' . $roleId;
    }
}
