<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Criar usuário administrador (se não existir)
        if (!User::where('email', 'admin@escola.com')->exists()) {
            User::factory()->create([
                'name' => 'Admin Escola',
                'email' => 'admin@escola.com',
                'password' => bcrypt('123456'),
                'email_verified_at' => now(),
            ]);
        }

        // Criar disciplinas criativas
        $this->call(DisciplinaSeeder::class);
        
        // Criar alunos e matrículas
        $this->call(AlunoSeeder::class);
    }
}
