export const USERS_ALL     = 'users.*'
export const USERS_CREATE  = 'users.create'
export const USERS_READ    = 'users.read'
export const USERS_UPDATE  = 'users.update'
export const USERS_DELETE  = 'users.delete'

export const USERS_GROUP_ALL = [
    USERS_ALL,
    USERS_CREATE,
    USERS_READ,
    USERS_UPDATE,
    USERS_DELETE
]
export const USERS_GROUP_CREATE = [
    USERS_ALL,
    USERS_CREATE
]
export const USERS_GROUP_READ = [
    USERS_ALL,
    USERS_READ
]
export const USERS_GROUP_UPDATE = [
    USERS_ALL,
    USERS_UPDATE
]
export const USERS_GROUP_DELETE = [
    USERS_ALL,
    USERS_DELETE
]

export const ROLES_ALL     = 'roles.*'
export const ROLES_CREATE  = 'roles.create'
export const ROLES_READ    = 'roles.read'
export const ROLES_UPDATE  = 'roles.update'
export const ROLES_DELETE  = 'roles.delete'

export const ROLES_GROUP_ALL = [
    ROLES_ALL,
    ROLES_CREATE,
    ROLES_READ,
    ROLES_UPDATE,
    ROLES_DELETE
]
export const ROLES_GROUP_CREATE = [
    ROLES_ALL,
    ROLES_CREATE
]
export const ROLES_GROUP_READ = [
    ROLES_ALL,
    ROLES_READ
]
export const ROLES_GROUP_UPDATE = [
    ROLES_ALL,
    ROLES_UPDATE
]
export const ROLES_GROUP_DELETE = [
    ROLES_ALL,
    ROLES_DELETE
]

export const PERMISSIONS_ALL     = 'permissions.*'
export const PERMISSIONS_READ    = 'permissions.read'
export const PERMISSIONS_ASSIGN  = 'permissions.assign'

export const PERMISSIONS_GROUP_ALL = [
    PERMISSIONS_ALL,
    PERMISSIONS_READ,
    PERMISSIONS_ASSIGN,
]
export const PERMISSIONS_GROUP_ASSIGN = [
    PERMISSIONS_ALL,
    PERMISSIONS_ASSIGN
]
export const PERMISSIONS_GROUP_READ = [
    PERMISSIONS_ALL,
    PERMISSIONS_READ
]

export const PLANS_ALL     = 'plans.*'
export const PLANS_CREATE  = 'plans.create'
export const PLANS_READ    = 'plans.read'
export const PLANS_UPDATE  = 'plans.update'
export const PLANS_DELETE  = 'plans.delete'

export const PLANS_GROUP_ALL = [
    PLANS_ALL,
    PLANS_CREATE,
    PLANS_READ,
    PLANS_UPDATE,
    PLANS_DELETE
]
export const PLANS_GROUP_CREATE = [
    PLANS_ALL,
    PLANS_CREATE
]
export const PLANS_GROUP_READ = [
    PLANS_ALL,
    PLANS_READ
]
export const PLANS_GROUP_UPDATE = [
    PLANS_ALL,
    PLANS_UPDATE
]
export const PLANS_GROUP_DELETE = [
    PLANS_ALL,
    PLANS_DELETE
]

export const USAGE_CATEGORIES_ALL     = 'usage-categories.*'
export const USAGE_CATEGORIES_CREATE  = 'usage-categories.create'
export const USAGE_CATEGORIES_READ    = 'usage-categories.read'
export const USAGE_CATEGORIES_UPDATE  = 'usage-categories.update'
export const USAGE_CATEGORIES_DELETE  = 'usage-categories.delete'

export const USAGE_CATEGORIES_GROUP_ALL = [
    USAGE_CATEGORIES_ALL,
    USAGE_CATEGORIES_CREATE,
    USAGE_CATEGORIES_READ,
    USAGE_CATEGORIES_UPDATE,
    USAGE_CATEGORIES_DELETE
]
export const USAGE_CATEGORIES_GROUP_CREATE = [
    USAGE_CATEGORIES_ALL,
    USAGE_CATEGORIES_CREATE
]
export const USAGE_CATEGORIES_GROUP_READ = [
    USAGE_CATEGORIES_ALL,
    USAGE_CATEGORIES_READ
]
export const USAGE_CATEGORIES_GROUP_UPDATE = [
    USAGE_CATEGORIES_ALL,
    USAGE_CATEGORIES_UPDATE
]
export const USAGE_CATEGORIES_GROUP_DELETE = [
    USAGE_CATEGORIES_ALL,
    USAGE_CATEGORIES_DELETE
]

export const ACCOUNT_SETTING_GROUP = [
    ...ROLES_GROUP_ALL,
    ...ROLES_GROUP_ALL,
]

export const QR_TYPES_ALL     = 'qr-types.*'
export const QR_TYPES_CREATE  = 'qr-types.create'
export const QR_TYPES_READ    = 'qr-types.read'
export const QR_TYPES_UPDATE  = 'qr-types.update'
export const QR_TYPES_DELETE  = 'qr-types.delete'

export const QR_TYPES_GROUP_ALL = [
    QR_TYPES_ALL,
    QR_TYPES_CREATE,
    QR_TYPES_READ,
    QR_TYPES_UPDATE,
    QR_TYPES_DELETE
]
export const QR_TYPES_GROUP_CREATE = [
    QR_TYPES_ALL,
    QR_TYPES_CREATE
]
export const QR_TYPES_GROUP_READ = [
    QR_TYPES_ALL,
    QR_TYPES_READ
]
export const QR_TYPES_GROUP_UPDATE = [
    QR_TYPES_ALL,
    QR_TYPES_UPDATE
]
export const QR_TYPES_GROUP_DELETE = [
    QR_TYPES_ALL,
    QR_TYPES_DELETE
]

export const QR_SETTING_GROUP = [
    ...QR_TYPES_GROUP_ALL
]

export const QR_ALL     = 'qr-codes.*'
export const QR_CREATE  = 'qr-codes.create'
export const QR_READ    = 'qr-codes.read'
export const QR_UPDATE  = 'qr-codes.update'
export const QR_DELETE  = 'qr-codes.delete'

export const QR_GROUP_ALL = [
    QR_ALL,
    QR_CREATE,
    QR_READ,
    QR_UPDATE,
    QR_DELETE
]
export const QR_GROUP_CREATE = [
    QR_ALL,
    QR_CREATE
]
export const QR_GROUP_READ = [
    QR_ALL,
    QR_READ
]
export const QR_GROUP_UPDATE = [
    QR_ALL,
    QR_UPDATE
]
export const QR_GROUP_DELETE = [
    QR_ALL,
    QR_DELETE
]

export const FAQ_ALL     = 'faqs.*'
export const FAQ_CREATE  = 'faqs.create'
export const FAQ_READ    = 'faqs.read'
export const FAQ_UPDATE  = 'faqs.update'
export const FAQ_DELETE  = 'faqs.delete'

export const FAQ_GROUP_ALL = [
    FAQ_ALL,
    FAQ_CREATE,
    FAQ_READ,
    FAQ_UPDATE,
    FAQ_DELETE
]
export const FAQ_GROUP_CREATE = [
    FAQ_ALL,
    FAQ_CREATE
]
export const FAQ_GROUP_READ = [
    FAQ_ALL,
    FAQ_READ
]
export const FAQ_GROUP_UPDATE = [
    FAQ_ALL,
    FAQ_UPDATE
]
export const FAQ_GROUP_DELETE = [
    FAQ_ALL,
    FAQ_DELETE
]

export const ACTIVITIES_READ = 'activities.read'