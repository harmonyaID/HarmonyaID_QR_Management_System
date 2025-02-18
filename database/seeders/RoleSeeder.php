<?php

namespace Database\Seeders;

use App\Models\Account\Permission;
use App\Models\Account\Role;
use App\Models\Account\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        try {

            DB::transaction(function () {

                $data = $this->getData();
                $superadminRole = null;
                foreach ($data as $index => $item) {
                    if (Role::where('name', $item['name'])->exists()) {
                        continue;
                    }
    
                    $role = Role::create($item);
                    if (!$index) {
                        $superadminRole = $role;
                    }
                }
    
                if (!User::count() || !$superadminRole) {
                    return;
                }
    
                $superadmin = User::where('email', 'superadmin@example.com')->first();
                if (empty($superadmin)) {
                    return;
                }
    
                $superadmin->update([
                    'roleId' => $superadminRole->id
                ]);

                $permissions = Permission::get();
                foreach ($permissions as $permission) {
                    $permission->assignRole($superadminRole);
                }

            });
        } catch (\Throwable $th) {
            exception($th);
        }
    }


    /** --- FUNCTIONS --- */

    private function getData()
    {
        return [
            [ 'name' => 'Superadmin', 'deletable' => false ],
            [ 'name' => 'User', 'deletable' => false ],
        ];
    }

}
