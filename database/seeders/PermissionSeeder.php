<?php

namespace Database\Seeders;

use App\Models\Account\Permission;
use App\Services\Constant\Account\PermissionCode;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = $this->getData();

        foreach ($data as $permission) {
            if (Permission::ofCode($permission['code'])->exists()) {
                continue;
            }

            Permission::create($permission);
        }
    }


    /** --- FUNCTIONS --- */

    private function getData()
    {
        return [
            ['name' => 'All User Permissions', 'code' => PermissionCode::USERS_ALL],
            ['name' => 'Create User', 'code' => PermissionCode::USERS_CREATE],
            ['name' => 'Read User', 'code' => PermissionCode::USERS_READ],
            ['name' => 'Update User', 'code' => PermissionCode::USERS_UPDATE],
            ['name' => 'Delete User', 'code' => PermissionCode::USERS_DELETE],

            ['name' => 'All Role Permissions', 'code' => PermissionCode::ROLES_ALL],
            ['name' => 'Create Role', 'code' => PermissionCode::ROLES_CREATE],
            ['name' => 'Read Role', 'code' => PermissionCode::ROLES_READ],
            ['name' => 'Update Role', 'code' => PermissionCode::ROLES_UPDATE],
            ['name' => 'Delete Role', 'code' => PermissionCode::ROLES_DELETE],

            ['name' => 'All Permission Permissions', 'code' => PermissionCode::PERMISSIONS_ALL],
            ['name' => 'Read Permission', 'code' => PermissionCode::PERMISSIONS_READ],
            ['name' => 'Assign Permission', 'code' => PermissionCode::PERMISSIONS_ASSIGN],
            
            ['name' => 'All Plan Permissions', 'code' => PermissionCode::PLANS_ALL],
            ['name' => 'Create Plan', 'code' => PermissionCode::PLANS_CREATE],
            ['name' => 'Read Plan', 'code' => PermissionCode::PLANS_READ],
            ['name' => 'Update Plan', 'code' => PermissionCode::PLANS_UPDATE],
            ['name' => 'Delete Plan', 'code' => PermissionCode::PLANS_DELETE],
            
            ['name' => 'All Usage Category Permissions', 'code' => PermissionCode::USAGE_CATEGORIES_ALL],
            ['name' => 'Create Usage Category', 'code' => PermissionCode::USAGE_CATEGORIES_CREATE],
            ['name' => 'Read Usage Category', 'code' => PermissionCode::USAGE_CATEGORIES_READ],
            ['name' => 'Update Usage Category', 'code' => PermissionCode::USAGE_CATEGORIES_UPDATE],
            ['name' => 'Delete Usage Category', 'code' => PermissionCode::USAGE_CATEGORIES_DELETE],
            
            ['name' => 'All QR Type Permissions', 'code' => PermissionCode::QR_TYPES_ALL],
            ['name' => 'Create QR Type', 'code' => PermissionCode::QR_TYPES_CREATE],
            ['name' => 'Read QR Type', 'code' => PermissionCode::QR_TYPES_READ],
            ['name' => 'Update QR Type', 'code' => PermissionCode::QR_TYPES_UPDATE],
            ['name' => 'Delete QR Type', 'code' => PermissionCode::QR_TYPES_DELETE],
            
            ['name' => 'All QR Code Permissions', 'code' => PermissionCode::QR_ALL],
            ['name' => 'Create QR Code', 'code' => PermissionCode::QR_CREATE],
            ['name' => 'Read QR Code', 'code' => PermissionCode::QR_READ],
            ['name' => 'Update QR Code', 'code' => PermissionCode::QR_UPDATE],
            ['name' => 'Delete QR Code', 'code' => PermissionCode::QR_DELETE],
            
            ['name' => 'All FAQ Permissions', 'code' => PermissionCode::FAQS_ALL],
            ['name' => 'Create FAQ', 'code' => PermissionCode::FAQS_CREATE],
            ['name' => 'Read FAQ', 'code' => PermissionCode::FAQS_READ],
            ['name' => 'Update FAQ', 'code' => PermissionCode::FAQS_UPDATE],
            ['name' => 'Delete FAQ', 'code' => PermissionCode::FAQS_DELETE],

            ['name' => 'Read All Activity Logs', 'code' => PermissionCode::ACTIVITIES_READ_ALL],
            ['name' => 'Read Activity Logs', 'code' => PermissionCode::ACTIVITIES_READ],
            ['name' => 'Manage System', 'code' => PermissionCode::SYSTEM_ALL],
        ];
    }

}
