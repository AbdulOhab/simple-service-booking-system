<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a single user
        // User::factory()->create();
        User::factory()->count(2)->create();
        // User::factory()->inactive()->create();
        // User::factory()->active()->create();

    }
}
