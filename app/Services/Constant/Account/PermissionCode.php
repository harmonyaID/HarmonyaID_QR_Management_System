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

    const ROLES_ALL     = 'roles.*';
    const ROLES_CREATE  = 'roles.create';
    const ROLES_READ    = 'roles.read';
    const ROLES_UPDATE  = 'roles.update';
    const ROLES_DELETE  = 'roles.delete';

    const PERMISSIONS_ALL     = 'permissions.*';
    const PERMISSIONS_READ    = 'permissions.read';
    const PERMISSIONS_ASSIGN  = 'permissions.assign';

    const PLANS_ALL     = 'plans.*';
    const PLANS_CREATE  = 'plans.create';
    const PLANS_READ    = 'plans.read';
    const PLANS_UPDATE  = 'plans.update';
    const PLANS_DELETE  = 'plans.delete';

    const USAGE_CATEGORIES_ALL     = 'usage-categories.*';
    const USAGE_CATEGORIES_CREATE  = 'usage-categories.create';
    const USAGE_CATEGORIES_READ    = 'usage-categories.read';
    const USAGE_CATEGORIES_UPDATE  = 'usage-categories.update';
    const USAGE_CATEGORIES_DELETE  = 'usage-categories.delete';

    const QR_TYPES_ALL     = 'qr-types.*';
    const QR_TYPES_CREATE  = 'qr-types.create';
    const QR_TYPES_READ    = 'qr-types.read';
    const QR_TYPES_UPDATE  = 'qr-types.update';
    const QR_TYPES_DELETE  = 'qr-types.delete';

    const QR_ALL     = 'qr-codes.*';
    const QR_CREATE  = 'qr-codes.create';
    const QR_READ    = 'qr-codes.read';
    const QR_UPDATE  = 'qr-codes.update';
    const QR_DELETE  = 'qr-codes.delete';
}
