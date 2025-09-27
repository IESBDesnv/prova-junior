<?php

namespace Database\Seeders;

use App\Models\Aluno;
use App\Models\Disciplina;
use App\Models\Matricula;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class AlunoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Criar alunos
        $alunos = [
            [
                'numero_matricula' => '2024001',
                'nome' => 'Ana Beatriz Silva',
                'email' => 'ana.beatriz@escola.com',
                'data_nascimento' => '2010-03-15',
                'telefone' => '11987654321',
                'cpf' => '12345678901',
                'ativo' => true,
            ],
            [
                'numero_matricula' => '2024002',
                'nome' => 'Carlos Eduardo Santos',
                'email' => 'carlos.santos@escola.com',
                'data_nascimento' => '2009-07-22',
                'telefone' => '11987654322',
                'cpf' => '12345678902',
                'ativo' => true,
            ],
            [
                'numero_matricula' => '2024003',
                'nome' => 'Maria Fernanda Oliveira',
                'email' => 'maria.fernanda@escola.com',
                'data_nascimento' => '2011-11-08',
                'telefone' => '11987654323',
                'cpf' => '12345678903',
                'ativo' => true,
            ],
            [
                'numero_matricula' => '2024004',
                'nome' => 'João Pedro Costa',
                'email' => 'joao.pedro@escola.com',
                'data_nascimento' => '2010-05-30',
                'telefone' => '11987654324',
                'cpf' => '12345678904',
                'ativo' => true,
            ],
            [
                'numero_matricula' => '2024005',
                'nome' => 'Larissa Souza Lima',
                'email' => 'larissa.souza@escola.com',
                'data_nascimento' => '2009-12-14',
                'telefone' => '11987654325',
                'cpf' => '12345678905',
                'ativo' => true,
            ],
            [
                'numero_matricula' => '2024006',
                'nome' => 'Pedro Henrique Alves',
                'email' => 'pedro.alves@escola.com',
                'data_nascimento' => '2011-01-25',
                'telefone' => '11987654326',
                'cpf' => '12345678906',
                'ativo' => true,
            ],
            [
                'numero_matricula' => '2024007',
                'nome' => 'Isabella Rodrigues',
                'email' => 'isabella.rodrigues@escola.com',
                'data_nascimento' => '2010-09-18',
                'telefone' => '11987654327',
                'cpf' => '12345678907',
                'ativo' => true,
            ],
            [
                'numero_matricula' => '2024008',
                'nome' => 'Lucas Gabriel Ferreira',
                'email' => 'lucas.gabriel@escola.com',
                'data_nascimento' => '2009-04-12',
                'telefone' => '11987654328',
                'cpf' => '12345678908',
                'ativo' => true,
            ],
            [
                'numero_matricula' => '2024009',
                'nome' => 'Sophia Mendes',
                'email' => 'sophia.mendes@escola.com',
                'data_nascimento' => '2011-08-03',
                'telefone' => '11987654329',
                'cpf' => '12345678909',
                'ativo' => true,
            ],
            [
                'numero_matricula' => '2024010',
                'nome' => 'Gabriel Martins',
                'email' => 'gabriel.martins@escola.com',
                'data_nascimento' => '2010-06-20',
                'telefone' => '11987654330',
                'cpf' => '12345678910',
                'ativo' => true,
            ],
            [
                'numero_matricula' => '2024011',
                'nome' => 'Valentina Pereira',
                'email' => 'valentina.pereira@escola.com',
                'data_nascimento' => '2009-10-07',
                'telefone' => '11987654331',
                'cpf' => '12345678911',
                'ativo' => false, // Aluno inativo
            ],
            [
                'numero_matricula' => '2024012',
                'nome' => 'Rafael Barbosa',
                'email' => 'rafael.barbosa@escola.com',
                'data_nascimento' => '2011-02-28',
                'telefone' => '11987654332',
                'cpf' => '12345678912',
                'ativo' => true,
            ],
        ];

        // Criar alunos no banco
        foreach ($alunos as $alunoData) {
            Aluno::create($alunoData);
        }

        // Buscar disciplinas existentes
        $disciplinas = Disciplina::all();

        // Criar matrículas aleatórias
        $statuses = ['ativa', 'inativa', 'concluida'];
        $notas = [6.5, 7.2, 8.0, 8.5, 9.0, 9.5, 10.0, null];

        foreach ($alunos as $alunoData) {
            $aluno = Aluno::where('numero_matricula', $alunoData['numero_matricula'])->first();
            
            // Cada aluno se matricula em 3-6 disciplinas aleatórias
            $disciplinasAleatorias = $disciplinas->random(rand(3, 6));
            
            foreach ($disciplinasAleatorias as $disciplina) {
                $status = $statuses[array_rand($statuses)];
                $nota = $status === 'concluida' ? $notas[array_rand($notas)] : null;
                
                Matricula::create([
                    'aluno_numero_matricula' => $aluno->numero_matricula,
                    'disciplina_id' => $disciplina->id,
                    'data_matricula' => Carbon::now()->subDays(rand(1, 180)),
                    'status' => $status,
                    'nota' => $nota,
                    'observacoes' => $status === 'concluida' ? 'Disciplina concluída com sucesso!' : null,
                ]);
            }
        }

        $this->command->info('✅ Alunos e matrículas criados com sucesso!');
        $this->command->info('📊 Total de alunos: ' . Aluno::count());
        $this->command->info('📚 Total de matrículas: ' . Matricula::count());
    }
}
