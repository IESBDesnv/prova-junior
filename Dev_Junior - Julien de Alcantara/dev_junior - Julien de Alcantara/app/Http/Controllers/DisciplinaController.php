<?php

namespace App\Http\Controllers;

use App\Models\Disciplina;
use App\Http\Requests\StoreDisciplinaRequest;
use App\Http\Requests\UpdateDisciplinaRequest;
use App\Services\DisciplinaService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DisciplinaController extends Controller
{
    public function __construct(
        private DisciplinaService $disciplinaService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $disciplinas = $this->disciplinaService->buscarDisciplinas($request);

        return Inertia::render('Disciplinas/Index', [
            'disciplinas' => $disciplinas,
            'filters' => $request->only(['search', 'status', 'sort_by', 'sort_direction']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Disciplinas/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreDisciplinaRequest $request)
    {
        $this->disciplinaService->criarDisciplina($request->validated());

        return redirect()->back()
            ->with('success', 'Disciplina criada com sucesso!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Disciplina $disciplina)
    {
        // Debug: verificar se a disciplina está sendo carregada
        \Log::info('Disciplina carregada:', [
            'id' => $disciplina->id,
            'nome' => $disciplina->nome,
            'codigo' => $disciplina->codigo,
            'carga_horaria' => $disciplina->carga_horaria,
            'ativa' => $disciplina->ativa
        ]);
        
        // Verificar se a disciplina existe
        if (!$disciplina) {
            abort(404, 'Disciplina não encontrada');
        }
        
        return Inertia::render('Disciplinas/Show', [
            'disciplina' => $disciplina,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Disciplina $disciplina)
    {
        return Inertia::render('Disciplinas/Edit', [
            'disciplina' => $disciplina,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateDisciplinaRequest $request, Disciplina $disciplina)
    {
        $this->disciplinaService->atualizarDisciplina($disciplina, $request->validated());

        return redirect()->back()
            ->with('success', 'Disciplina atualizada com sucesso!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Disciplina $disciplina)
    {
        $this->disciplinaService->excluirDisciplina($disciplina);

        return redirect()->back()
            ->with('success', 'Disciplina excluída com sucesso!');
    }

    /**
     * Toggle the status of a disciplina
     */
    public function toggleStatus(Disciplina $disciplina)
    {
        $this->disciplinaService->alternarStatus($disciplina);

        $status = $disciplina->fresh()->ativa ? 'ativada' : 'desativada';
        
        return redirect()->back()
            ->with('success', "Disciplina {$status} com sucesso!");
    }
}
