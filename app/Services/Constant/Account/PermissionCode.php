<?php

namespace App\Services\Constant\Account;

use App\Services\Constant\BaseCodeName;

class PermissionCode extends BaseCodeName
{
    const USERS_ALL     = 'users.*';
    const USERS_CREATE  = 'users.create';
    const USERS_READ    = 'users.read';
    const USERS_UPDATE  = 'users.update';
    const USERS_DELETE  = 'users.delete';
    const USERS_GROUP_ALL = [
        self::USERS_ALL,
        self::USERS_CREATE,
        self::USERS_READ,
        self::USERS_UPDATE,
        self::USERS_DELETE,
    ];

    const ROLES_ALL     = 'roles.*';
    const ROLES_CREATE  = 'roles.create';
    const ROLES_READ    = 'roles.read';
    const ROLES_UPDATE  = 'roles.update';
    const ROLES_DELETE  = 'roles.delete';
    const ROLES_GROUP_ALL = [
        self::ROLES_ALL,
        self::ROLES_CREATE,
        self::ROLES_READ,
        self::ROLES_UPDATE,
        self::ROLES_DELETE,
    ];

    const PERMISSIONS_ALL     = 'permissions.*';
    const PERMISSIONS_READ    = 'permissions.read';
    const PERMISSIONS_ASSIGN  = 'permissions.assign';
    const PERMISSIONS_GROUP_ALL = [
        self::PERMISSIONS_ALL,
        self::PERMISSIONS_READ,
        self::PERMISSIONS_ASSIGN,
    ];

    const PLANS_ALL     = 'plans.*';
    const PLANS_CREATE  = 'plans.create';
    const PLANS_READ    = 'plans.read';
    const PLANS_UPDATE  = 'plans.update';
    const PLANS_DELETE  = 'plans.delete';
    const PLANS_GROUP_ALL = [
        self::PLANS_ALL,
        self::PLANS_CREATE,
        self::PLANS_READ,
        self::PLANS_UPDATE,
        self::PLANS_DELETE,
    ];

    const USAGE_CATEGORIES_ALL     = 'usage-categories.*';
    const USAGE_CATEGORIES_CREATE  = 'usage-categories.create';
    const USAGE_CATEGORIES_READ    = 'usage-categories.read';
    const USAGE_CATEGORIES_UPDATE  = 'usage-categories.update';
    const USAGE_CATEGORIES_DELETE  = 'usage-categories.delete';
    const USAGE_CATEGORIES_GROUP_ALL = [
        self::USAGE_CATEGORIES_ALL,
        self::USAGE_CATEGORIES_CREATE,
        self::USAGE_CATEGORIES_READ,
        self::USAGE_CATEGORIES_UPDATE,
        self::USAGE_CATEGORIES_DELETE,
    ];

    const QR_TYPES_ALL     = 'qr-types.*';
    const QR_TYPES_CREATE  = 'qr-types.create';
    const QR_TYPES_READ    = 'qr-types.read';
    const QR_TYPES_UPDATE  = 'qr-types.update';
    const QR_TYPES_DELETE  = 'qr-types.delete';
    const QR_TYPES_GROUP_ALL = [
        self::QR_TYPES_ALL,
        self::QR_TYPES_CREATE,
        self::QR_TYPES_READ,
        self::QR_TYPES_UPDATE,
        self::QR_TYPES_DELETE,
    ];

    const QR_ALL     = 'qr-codes.*';
    const QR_CREATE  = 'qr-codes.create';
    const QR_READ    = 'qr-codes.read';
    const QR_UPDATE  = 'qr-codes.update';
    const QR_DELETE  = 'qr-codes.delete';
    const QR_GROUP_ALL = [
        self::QR_ALL,
        self::QR_CREATE,
        self::QR_READ,
        self::QR_UPDATE,
        self::QR_DELETE,
    ];

    const FAQS_ALL     = 'faqs.*';
    const FAQS_CREATE  = 'faqs.create';
    const FAQS_READ    = 'faqs.read';
    const FAQS_UPDATE  = 'faqs.update';
    const FAQS_DELETE  = 'faqs.delete';
    const FAQS_GROUP_ALL = [
        self::FAQS_ALL,
        self::FAQS_CREATE,
        self::FAQS_READ,
        self::FAQS_UPDATE,
        self::FAQS_DELETE,
    ];

    const ACTIVITIES_READ_ALL   = 'activities.*';
    const ACTIVITIES_READ       = 'activities.read';
    const SYSTEM_ALL            = 'system.*';
}
