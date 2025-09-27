<?php

namespace Database\Seeders;

use App\Models\Disciplina;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DisciplinaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $disciplinas = [
            [
                'nome' => 'Maker e Code',
                'codigo' => 'MAKER001',
                'carga_horaria' => 40,
                'ativa' => true,
            ],
            [
                'nome' => 'Robótica Criativa',
                'codigo' => 'ROBOT001',
                'carga_horaria' => 35,
                'ativa' => true,
            ],
            [
                'nome' => 'Educação Física',
                'codigo' => 'EDFIS001',
                'carga_horaria' => 30,
                'ativa' => true,
            ],
            [
                'nome' => 'Aulas ao Ar Livre',
                'codigo' => 'ARLIV001',
                'carga_horaria' => 25,
                'ativa' => true,
            ],
            [
                'nome' => 'Leitura e Imaginação',
                'codigo' => 'LEIT001',
                'carga_horaria' => 30,
                'ativa' => true,
            ],
            [
                'nome' => 'Criatividade e Arte',
                'codigo' => 'CRIAT001',
                'carga_horaria' => 35,
                'ativa' => true,
            ],
            [
                'nome' => 'Desenho e Pintura',
                'codigo' => 'DESEN001',
                'carga_horaria' => 30,
                'ativa' => true,
            ],
            [
                'nome' => 'Empreendedorismo Infantil',
                'codigo' => 'EMPRE001',
                'carga_horaria' => 25,
                'ativa' => true,
            ],
            [
                'nome' => 'Cidadania e Constitucional',
                'codigo' => 'CIDAD001',
                'carga_horaria' => 20,
                'ativa' => true,
            ],
            [
                'nome' => 'Educação Financeira',
                'codigo' => 'FINAN001',
                'carga_horaria' => 25,
                'ativa' => true,
            ],
            [
                'nome' => 'Música e Expressão',
                'codigo' => 'MUSIC001',
                'carga_horaria' => 30,
                'ativa' => true,
            ],
            [
                'nome' => 'Teatro e Dramatização',
                'codigo' => 'TEATR001',
                'carga_horaria' => 35,
                'ativa' => true,
            ],
        ];

        foreach ($disciplinas as $disciplina) {
            Disciplina::create($disciplina);
        }
    }
}
