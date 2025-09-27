<?php

namespace App\Http\Controllers;

use App\Models\Disciplina;
use App\Models\Aluno;
use App\Models\Matricula;
use App\Services\DisciplinaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RelatorioController extends Controller
{
    public function __construct(
        private DisciplinaService $disciplinaService
    ) {}

    /**
     * Página principal de relatórios
     */
    public function index()
    {
        // Estatísticas gerais para o dashboard de relatórios
        $totalAlunos = Aluno::count();
        $totalDisciplinas = Disciplina::count();
        $totalMatriculas = Matricula::count();
        $disciplinasAtivas = Disciplina::where('ativa', true)->count();
        $matriculasAtivas = Matricula::where('status', 'ativa')->count();

        return Inertia::render('Relatorios/Index', [
            'estatisticas' => [
                'total_alunos' => $totalAlunos,
                'total_disciplinas' => $totalDisciplinas,
                'total_matriculas' => $totalMatriculas,
                'disciplinas_ativas' => $disciplinasAtivas,
                'matriculas_ativas' => $matriculasAtivas,
                'media_disciplinas_por_aluno' => $totalAlunos > 0 ? round($totalMatriculas / $totalAlunos, 2) : 0
            ]
        ]);
    }


    /**
     * Relatório de alunos e suas disciplinas matriculadas
     */
    public function alunosDisciplinas(Request $request)
    {
        \Log::info('Iniciando relatório de alunos e disciplinas');
        $alunos = Aluno::with(['matriculas.disciplina'])->get();
        \Log::info('Alunos carregados: ' . $alunos->count());
        
        // Estatísticas gerais
        $totalAlunos = $alunos->count();
        $totalMatriculas = Matricula::count();
        $matriculasAtivas = Matricula::where('status', 'ativa')->count();
        $mediaDisciplinasPorAluno = $totalMatriculas > 0 ? round($totalMatriculas / $totalAlunos, 2) : 0;
        
        // Alunos com mais disciplinas
        $alunosComMaisDisciplinas = $alunos->map(function ($aluno) {
            return [
                'id' => $aluno->id,
                'nome' => $aluno->nome,
                'email' => $aluno->email,
                'total_disciplinas' => $aluno->matriculas->count(),
                'disciplinas' => $aluno->matriculas->map(function ($matricula) {
                    return [
                        'nome' => $matricula->disciplina->nome,
                        'codigo' => $matricula->disciplina->codigo,
                        'carga_horaria' => $matricula->disciplina->carga_horaria,
                        'data_matricula' => $matricula->created_at->format('d/m/Y')
                    ];
                })
            ];
        })->sortByDesc('total_disciplinas')->take(10);

        // Disciplinas mais populares
        $disciplinasPopulares = Disciplina::withCount('matriculas')
            ->orderBy('matriculas_count', 'desc')
            ->take(5)
            ->get()
            ->map(function ($disciplina) {
                return [
                    'nome' => $disciplina->nome,
                    'codigo' => $disciplina->codigo,
                    'total_alunos' => $disciplina->matriculas_count,
                    'carga_horaria' => $disciplina->carga_horaria
                ];
            });

        return Inertia::render('Relatorios/AlunosDisciplinas', [
            'alunos' => $alunos->map(function ($aluno) {
                return [
                    'id' => $aluno->id,
                    'nome' => $aluno->nome,
                    'email' => $aluno->email,
                    'data_nascimento' => $aluno->data_nascimento,
                    'total_disciplinas' => $aluno->matriculas->count(),
                    'disciplinas' => $aluno->matriculas->map(function ($matricula) {
                        return [
                            'id' => $matricula->disciplina->id,
                            'nome' => $matricula->disciplina->nome,
                            'codigo' => $matricula->disciplina->codigo,
                            'carga_horaria' => $matricula->disciplina->carga_horaria,
                            'data_matricula' => $matricula->created_at->format('d/m/Y'),
                            'status' => $matricula->status === 'ativa' ? 'Ativa' : 'Inativa'
                        ];
                    })
                ];
            }),
            'estatisticas' => [
                'total_alunos' => $totalAlunos,
                'total_matriculas' => $totalMatriculas,
                'media_disciplinas_por_aluno' => $mediaDisciplinasPorAluno,
                'alunos_com_mais_disciplinas' => $alunosComMaisDisciplinas,
                'disciplinas_populares' => $disciplinasPopulares
            ]
        ]);
    }

    /**
     * Relatório detalhado de um aluno específico
     */
    public function alunoDetalhado(Aluno $aluno)
    {
        $aluno->load(['matriculas.disciplina']);
        
        $disciplinas = $aluno->matriculas->map(function ($matricula) {
            return [
                'id' => $matricula->disciplina->id,
                'nome' => $matricula->disciplina->nome,
                'codigo' => $matricula->disciplina->codigo,
                'carga_horaria' => $matricula->disciplina->carga_horaria,
                'data_matricula' => $matricula->created_at->format('d/m/Y'),
                'status' => $matricula->status === 'ativa' ? 'Ativa' : 'Inativa',
                'total_carga_horaria' => $matricula->disciplina->carga_horaria
            ];
        });

        $cargaHorariaTotal = $disciplinas->sum('carga_horaria');
        $disciplinasAtivas = $disciplinas->where('status', 'Ativa')->count();

        return Inertia::render('Relatorios/AlunoDetalhado', [
            'aluno' => [
                'id' => $aluno->id,
                'nome' => $aluno->nome,
                'email' => $aluno->email,
                'data_nascimento' => $aluno->data_nascimento,
                'idade' => $aluno->idade,
                'total_disciplinas' => $disciplinas->count(),
                'disciplinas_ativas' => $disciplinasAtivas,
                'carga_horaria_total' => $cargaHorariaTotal
            ],
            'disciplinas' => $disciplinas,
            'estatisticas' => [
                'total_disciplinas' => $disciplinas->count(),
                'disciplinas_ativas' => $disciplinasAtivas,
                'disciplinas_inativas' => $disciplinas->count() - $disciplinasAtivas,
                'carga_horaria_total' => $cargaHorariaTotal,
                'carga_horaria_media' => $disciplinas->count() > 0 ? round($cargaHorariaTotal / $disciplinas->count(), 2) : 0
            ]
        ]);
    }

    /**
     * Exportar relatório de alunos para CSV
     */
    public function exportarAlunosDisciplinas()
    {
        $alunos = Aluno::with(['matriculas.disciplina'])->get();
        
        $csv = "Nome do Aluno,Email,Total de Disciplinas,Disciplinas Matriculadas\n";
        
        foreach ($alunos as $aluno) {
            $disciplinas = $aluno->matriculas->map(function ($matricula) {
                return $matricula->disciplina->nome . ' (' . $matricula->disciplina->codigo . ')';
            })->implode('; ');
            
            $csv .= sprintf(
                "%s,%s,%d,\"%s\"\n",
                $aluno->nome,
                $aluno->email,
                $aluno->matriculas->count(),
                $disciplinas
            );
        }

        return response($csv)
            ->header('Content-Type', 'text/csv')
            ->header('Content-Disposition', 'attachment; filename="alunos_disciplinas.csv"');
    }

}
