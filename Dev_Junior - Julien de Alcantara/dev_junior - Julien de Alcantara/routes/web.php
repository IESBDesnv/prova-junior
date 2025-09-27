<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DisciplinaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RelatorioController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // Se o usuário já estiver autenticado, redireciona para as disciplinas
    if (auth()->check()) {
        return redirect()->route('disciplinas.index');
    }
    
    // Se não estiver autenticado, redireciona para o login
    return redirect()->route('login');
});

// Rotas de teste para páginas de erro (apenas em desenvolvimento)
if (app()->environment('local')) {
    Route::get('/test-404', function () {
        return Inertia::render('Errors/404');
    });
    
    Route::get('/test-403', function () {
        return Inertia::render('Errors/403');
    });
    
    Route::get('/test-500', function () {
        return Inertia::render('Errors/500');
    });
    
    // Rota específica para testar disciplina não encontrada
    Route::get('/disciplinas/test-not-found', function () {
        return Inertia::render('Errors/404');
    });
    
    // Rota de teste para show de disciplina
    Route::get('/test-disciplina-show', function () {
        $disciplina = App\Models\Disciplina::first();
        if (!$disciplina) {
            return 'Nenhuma disciplina encontrada no banco';
        }
        return Inertia::render('Disciplinas/Show', [
            'disciplina' => $disciplina
        ]);
    });
}


Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

// Rota de teste sem middleware
Route::get('/dashboard-test', [DashboardController::class, 'index'])->name('dashboard.test');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Rotas das Disciplinas
    Route::resource('disciplinas', DisciplinaController::class);

// Rotas de Relatórios
Route::prefix('relatorios')->name('relatorios.')->group(function () {
    Route::get('/', [App\Http\Controllers\RelatorioController::class, 'index'])->name('index');
    Route::get('/alunos-disciplinas', [App\Http\Controllers\RelatorioController::class, 'alunosDisciplinas'])->name('alunos-disciplinas');
    Route::get('/aluno/{aluno}', [App\Http\Controllers\RelatorioController::class, 'alunoDetalhado'])->name('aluno-detalhado');
    Route::get('/exportar/alunos-disciplinas', [App\Http\Controllers\RelatorioController::class, 'exportarAlunosDisciplinas'])->name('exportar.alunos-disciplinas');
});
    
    // Rota adicional para alternar status
    Route::patch('/disciplinas/{disciplina}/toggle-status', [DisciplinaController::class, 'toggleStatus'])
        ->name('disciplinas.toggle-status');
    
    // Rotas de Relatórios
    Route::get('/relatorios/disciplinas', [RelatorioController::class, 'disciplinas'])->name('relatorios.disciplinas');
    Route::get('/relatorios/disciplinas/exportar', [RelatorioController::class, 'exportarDisciplinas'])->name('relatorios.disciplinas.exportar');
});

require __DIR__.'/auth.php';
