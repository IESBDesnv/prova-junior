<?php

namespace Database\Seeders;

use App\Models\Disciplina;
use App\Models\Aluno;
use App\Models\Matricula;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FactorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🌱 Iniciando seeders com factories...');

        // Criar disciplinas usando factory
        $this->command->info('📚 Criando disciplinas...');
        $disciplinas = Disciplina::factory()
            ->count(15)
            ->create();
        
        $this->command->info("✅ {$disciplinas->count()} disciplinas criadas!");

        // Criar alunos usando factory
        $this->command->info('👥 Criando alunos...');
        $alunos = Aluno::factory()
            ->count(25)
            ->create();
        
        $this->command->info("✅ {$alunos->count()} alunos criados!");

        // Criar matrículas usando factory
        $this->command->info('📝 Criando matrículas...');
        
        $matriculasCriadas = 0;
        $tentativas = 0;
        $maxTentativas = 1000;
        
        // Criar matrículas aleatórias evitando duplicatas
        while ($matriculasCriadas < 50 && $tentativas < $maxTentativas) {
            $aluno = $alunos->random();
            $disciplina = $disciplinas->random();
            
            // Verificar se já existe matrícula para este aluno nesta disciplina
            $existeMatricula = Matricula::where('aluno_numero_matricula', $aluno->numero_matricula)
                ->where('disciplina_id', $disciplina->id)
                ->exists();
            
            if (!$existeMatricula) {
                Matricula::factory()
                    ->comAluno($aluno->numero_matricula)
                    ->comDisciplina($disciplina->id)
                    ->create();
                $matriculasCriadas++;
            }
            
            $tentativas++;
        }
        
        $this->command->info("✅ {$matriculasCriadas} matrículas criadas!");

        // Criar algumas matrículas específicas
        $this->command->info('🎯 Criando matrículas específicas...');
        
        $statusMatriculas = [
            'ativa' => 20,
            'concluida' => 15,
            'inativa' => 10
        ];
        
        foreach ($statusMatriculas as $status => $quantidade) {
            $criadas = 0;
            $tentativas = 0;
            
            while ($criadas < $quantidade && $tentativas < $maxTentativas) {
                $aluno = $alunos->random();
                $disciplina = $disciplinas->random();
                
                // Verificar se já existe matrícula para este aluno nesta disciplina
                $existeMatricula = Matricula::where('aluno_numero_matricula', $aluno->numero_matricula)
                    ->where('disciplina_id', $disciplina->id)
                    ->exists();
                
                if (!$existeMatricula) {
                    Matricula::factory()
                        ->comAluno($aluno->numero_matricula)
                        ->comDisciplina($disciplina->id)
                        ->{$status}()
                        ->create();
                    $criadas++;
                }
                
                $tentativas++;
            }
            
            $this->command->info("✅ {$criadas} matrículas {$status} criadas!");
        }

        $this->command->info('🎉 Seeders com factories concluídos!');
        $this->command->info("📊 Resumo:");
        $this->command->info("- Disciplinas: " . Disciplina::count());
        $this->command->info("- Alunos: " . Aluno::count());
        $this->command->info("- Matrículas: " . Matricula::count());
    }
}