<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // User::Create([
        //     'name' => 'System Admin',
        //     'email' => 'admin@gmail.com',
        //     'password' => Hash::make('admin12345'),
        //     'role' => 'admin',
        //     'email_verified_at' => now(),
        // ]);

        // Admin Download
        User::create([
            'name' => 'Admin',
            'email' => 'admin@qtec.com',
            'password' => Hash::make('adminqtec'),
            'role' => 'admin',
            'email_verified_at' => now(),
        ]);
    }
}
