<?php

namespace App\Services\Constant\Activity;

use App\Services\Constant\BaseCodeName;

class ActivityType extends BaseCodeName
{
    const GENERAL = 'general';
    const COMPONENT = 'component';

    const ACCOUNT = 'account';
    const USER = 'user';
    const USAGE_CATEGORY = 'usage category';
    const PLAN = 'plan';

    const QR = 'qr';
    const QR_TYPE = 'qr type';
    const QR_VISITOR = 'qr visitor';

    const OPTION = [
        self::GENERAL,
        self::COMPONENT,
        
        self::ACCOUNT,
        self::USER,
        self::USAGE_CATEGORY,
        self::PLAN,

        self::QR,
        self::QR_TYPE,
        self::QR_VISITOR,
    ];

}
