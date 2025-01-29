<?php

namespace App\Services\Constant\Bill;

use App\Services\Constant\BaseIDName;

class PaymentMethod extends BaseIDName
{
    const BANK_TRANSFER_ID = 1;
    const BANK_TRANSFER = 'Bank Transfer';

    const OPTION = [
        self::BANK_TRANSFER_ID => self::BANK_TRANSFER,
    ];

}
