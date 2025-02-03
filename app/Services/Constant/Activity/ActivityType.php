<?php

namespace App\Services\Constant\Activity;

use App\Services\Constant\BaseCodeName;

class ActivityType extends BaseCodeName
{
    const GENERAL = 'general';
    const COMPONENT = 'component';
    const ACCOUNT = 'account';
    const USER = 'user';

    const OPTION = [
        self::GENERAL,
        self::COMPONENT,
        
        self::ACCOUNT,
        self::USER,
    ];

}
