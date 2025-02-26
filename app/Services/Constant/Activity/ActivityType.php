<?php

namespace App\Services\Constant\Activity;

use App\Services\Constant\Account\PermissionCode;
use App\Services\Constant\BaseCodeName;
use Illuminate\Http\Request;

class ActivityType extends BaseCodeName
{
    const GENERAL = 'general';
    const COMPONENT = 'component';

    const ACCOUNT = 'account';
    const USER = 'user';
    const ROLE = 'role';
    const USAGE_CATEGORY = 'usage category';
    const PLAN = 'plan';

    const QR = 'qr';
    const QR_TYPE = 'qr type';
    const QR_VISITOR = 'qr visitor';

    const MISC = 'misc';
    const FAQ = 'faq';

    const OPTION = [
        self::ACCOUNT,
        self::USER,
        self::ROLE,
        self::USAGE_CATEGORY,
        self::PLAN,

        self::QR,
        self::QR_TYPE,
        self::QR_VISITOR,

        self::MISC,
        self::FAQ,
    ];


    public static function getTypes(Request $request)
    {
        $output = [
            ['label' => 'All', 'value' => ''],
        ];

        $canAccessUsers             = has_permissions(...PermissionCode::USERS_GROUP_ALL);
        $canAccessRoles             = has_permissions(...PermissionCode::ROLES_GROUP_ALL);
        $canAccessUsageCategories   = has_permissions(...PermissionCode::USAGE_CATEGORIES_GROUP_ALL);
        $canAccessPlans             = has_permissions(...PermissionCode::PLANS_GROUP_ALL);

        if ($canAccessUsers || $canAccessRoles || $canAccessUsageCategories || $canAccessPlans) {
            $output[] = [ 'label' => ucwords(self::ACCOUNT), 'value' => self::ACCOUNT ];
        }

        if ($canAccessUsers) {
            $output[] = [ 'label' => ucwords(self::USER), 'value' => self::USER ];
        }

        if ($canAccessRoles) {
            $output[] = [ 'label' => ucwords(self::ROLE), 'value' => self::ROLE ];
        }

        if ($canAccessUsageCategories) {
            $output[] = [ 'label' => ucwords(self::USAGE_CATEGORY), 'value' => self::USAGE_CATEGORY ];
        }

        if ($canAccessPlans) {
            $output[] = [ 'label' => ucwords(self::PLAN), 'value' => self::PLAN ];
        }

        $canAccessQr        = has_permissions(...PermissionCode::QR_GROUP_ALL);
        $canAccessQrType    = has_permissions(...PermissionCode::QR_TYPES_GROUP_ALL);

        if ($canAccessQr || $canAccessQrType) {
            $output[] = [ 'label' => ucwords(self::QR), 'value' => self::QR ];
        }

        if ($canAccessQrType) {
            $output[] = [ 'label' => ucwords(self::QR_TYPE), 'value' => self::QR_TYPE ];
        }

        $canAccessFaq = has_permissions(...PermissionCode::FAQS_GROUP_ALL);

        if ($canAccessFaq) {
            $output[] = [ 'label' => ucwords(self::MISC), 'value' => self::MISC ];
            $output[] = [ 'label' => ucwords(self::FAQ), 'value' => self::FAQ ];
        }


        if (!empty($request->search)) {
            $output = array_filter($output, function ($type) use ($request) {
                $search = strtolower($request->search);
                return str_contains($type['value'], $search);
            });
        }

        return $output;
    }
}
