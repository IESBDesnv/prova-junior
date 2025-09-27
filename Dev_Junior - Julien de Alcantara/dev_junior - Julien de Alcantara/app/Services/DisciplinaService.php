<?php

namespace App\Services;

use App\Models\Disciplina;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class DisciplinaService
{
    /**
     * Buscar disciplinas com filtros e paginação
     */
    public function buscarDisciplinas(Request $request): LengthAwarePaginator
    {
        $query = Disciplina::query();

        // Aplicar filtros
        $this->aplicarFiltros($query, $request);

        // Aplicar ordenação
        $this->aplicarOrdenacao($query, $request);

        // Retornar com paginação (máximo 9 disciplinas por página)
        return $query->paginate(9)->withQueryString();
    }

    /**
     * Aplicar filtros na query
     */
    private function aplicarFiltros($query, Request $request): void
    {
        // Filtro de busca
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nome', 'like', "%{$search}%")
                  ->orWhere('codigo', 'like', "%{$search}%");
            });
        }

        // Filtro de status
        if ($request->filled('status')) {
            $query->where('ativa', $request->status === 'ativa');
        }
    }

    /**
     * Aplicar ordenação na query
     */
    private function aplicarOrdenacao($query, Request $request): void
    {
        $sortBy = $request->get('sort_by', 'nome');
        $sortDirection = $request->get('sort_direction', 'asc');
        
        $query->orderBy($sortBy, $sortDirection);
    }

    /**
     * Criar nova disciplina
     */
    public function criarDisciplina(array $dados): Disciplina
    {
        return Disciplina::create($dados);
    }

    /**
     * Atualizar disciplina
     */
    public function atualizarDisciplina(Disciplina $disciplina, array $dados): bool
    {
        return $disciplina->update($dados);
    }

    /**
     * Excluir disciplina
     */
    public function excluirDisciplina(Disciplina $disciplina): bool
    {
        return $disciplina->delete();
    }

    /**
     * Alternar status da disciplina
     */
    public function alternarStatus(Disciplina $disciplina): bool
    {
        return $disciplina->update([
            'ativa' => !$disciplina->ativa,
        ]);
    }

    /**
     * Buscar disciplina por ID
     */
    public function buscarPorId(int $id): ?Disciplina
    {
        return Disciplina::find($id);
    }

    /**
     * Buscar disciplinas ativas
     */
    public function buscarAtivas(): \Illuminate\Database\Eloquent\Collection
    {
        return Disciplina::ativas()->get();
    }

    /**
     * Buscar disciplinas inativas
     */
    public function buscarInativas(): \Illuminate\Database\Eloquent\Collection
    {
        return Disciplina::inativas()->get();
    }
}
