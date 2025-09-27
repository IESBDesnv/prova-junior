<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Matricula extends Model
{
    use HasFactory;

    /**
     * Atributos que podem ser preenchidos em massa
     */
    protected $fillable = [
        'aluno_numero_matricula',
        'disciplina_id',
        'data_matricula',
        'status',
        'nota',
        'observacoes',
    ];

    /**
     * Atributos que devem ser convertidos
     */
    protected $casts = [
        'data_matricula' => 'date',
        'nota' => 'decimal:1',
    ];

    /**
     * Relacionamento: Uma matrícula pertence a um aluno
     */
    public function aluno()
    {
        return $this->belongsTo(Aluno::class, 'aluno_numero_matricula', 'numero_matricula');
    }

    /**
     * Relacionamento: Uma matrícula pertence a uma disciplina
     */
    public function disciplina()
    {
        return $this->belongsTo(Disciplina::class);
    }

    /**
     * Scope para matrículas ativas
     */
    public function scopeAtivas($query)
    {
        return $query->where('status', 'ativa');
    }

    /**
     * Scope para matrículas inativas
     */
    public function scopeInativas($query)
    {
        return $query->where('status', 'inativa');
    }

    /**
     * Scope para matrículas concluídas
     */
    public function scopeConcluidas($query)
    {
        return $query->where('status', 'concluida');
    }

    /**
     * Scope para buscar por disciplina
     */
    public function scopePorDisciplina($query, $disciplinaId)
    {
        return $query->where('disciplina_id', $disciplinaId);
    }

    /**
     * Scope para buscar por aluno
     */
    public function scopePorAluno($query, $numeroMatricula)
    {
        return $query->where('aluno_numero_matricula', $numeroMatricula);
    }

    /**
     * Accessor para formatação do status
     */
    public function getStatusFormatadoAttribute()
    {
        return match($this->status) {
            'ativa' => 'Ativa',
            'inativa' => 'Inativa',
            'concluida' => 'Concluída',
            default => 'Desconhecido'
        };
    }

    /**
     * Accessor para formatação da nota
     */
    public function getNotaFormatadaAttribute()
    {
        return $this->nota ? number_format($this->nota, 1, ',', '.') : 'N/A';
    }

    /**
     * Accessor para verificar se está aprovado
     */
    public function getAprovadoAttribute()
    {
        return $this->nota && $this->nota >= 6.0;
    }

    /**
     * Accessor para verificar se está reprovado
     */
    public function getReprovadoAttribute()
    {
        return $this->nota && $this->nota < 6.0;
    }
}
