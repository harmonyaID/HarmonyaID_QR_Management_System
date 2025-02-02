<?php

namespace Database\Seeders;

use App\Models\Account\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (User::count()) {
            return;
        }

        User::create($this->getData());
    }


    /** --- FUNCTIONS --- */

    private function getData()
    {
        return [
            'firstname' => 'Super',
            'lastname'  => 'Admin',
            'email'     => 'superadmin@example.com',
            'password'  => Hash::make('Admin#12345'),
        ];
    }

}
