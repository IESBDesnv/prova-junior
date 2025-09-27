<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use App\Models\Disciplina;
use App\Models\Matricula;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Exibir dashboard com estatísticas e gráficos
     */
    public function index()
    {
        \Log::info('Iniciando dashboard controller');
        
        // Estatísticas básicas do banco
        $estatisticas = [
            'total_alunos' => \App\Models\Aluno::count(),
            'total_disciplinas' => \App\Models\Disciplina::count(),
            'total_matriculas' => \App\Models\Matricula::count(),
            'alunos_ativos' => \App\Models\Aluno::ativos()->count(),
            'disciplinas_ativas' => \App\Models\Disciplina::ativas()->count(),
            'matriculas_ativas' => \App\Models\Matricula::ativas()->count(),
        ];
        
        \Log::info('Estatísticas carregadas:', $estatisticas);
        
        // Verificar se há dados no banco
        $totalAlunos = \App\Models\Aluno::count();
        $totalDisciplinas = \App\Models\Disciplina::count();
        $totalMatriculas = \App\Models\Matricula::count();
        
        \Log::info("Dados do banco - Alunos: {$totalAlunos}, Disciplinas: {$totalDisciplinas}, Matrículas: {$totalMatriculas}");


        // Dados para disciplinas populares
        $disciplinasPopulares = \App\Models\Disciplina::withCount('matriculas')
            ->orderBy('matriculas_count', 'desc')
            ->take(5)
            ->get()
            ->map(function ($disciplina) {
                return [
                    'nome' => $disciplina->nome,
                    'alunos' => $disciplina->matriculas_count
                ];
            });

        return Inertia::render('Dashboard', [
            'estatisticas' => $estatisticas,
            'disciplinasPopulares' => $disciplinasPopulares,
        ]);
    }
}
