<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model; // baselaravel
use Illuminate\Database\Eloquent\Factories\HasFactory; // trait 

class Disciplina extends Model
{
    
    use HasFactory;


    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nome',
        'codigo',
        'carga_horaria',
        'ativa',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'ativa' => 'boolean',
        'carga_horaria' => 'integer',
    ];

    /**
     * Scope para disciplinas ativas
     */
    public function scopeAtivas($query)
    {
        return $query->where('ativa', true);
    }

    /**
     * Scope para disciplinas inativas
     */
    public function scopeInativas($query)
    {
        return $query->where('ativa', false);
    }

    /**
     * Scope para buscar por nome
     */
    public function scopePorNome($query, $nome)
    {
        return $query->where('nome', 'like', "%{$nome}%");
    }

    /**
     * Scope para buscar por código
     */
    public function scopePorCodigo($query, $codigo)
    {
        return $query->where('codigo', 'like', "%{$codigo}%");
    }

    /**
     * Accessor para formatação do status
     */
    public function getStatusFormatadoAttribute()
    {
        return $this->ativa ? 'Ativa' : 'Inativa';
    }

    /**
     * Accessor para formatação da carga horária
     */
    public function getCargaHorariaFormatadaAttribute()
    {
        return $this->carga_horaria . ' horas';
    }

    /**
     * Relacionamento: Uma disciplina tem muitas matrículas
     */
    public function matriculas()
    {
        return $this->hasMany(Matricula::class);
    }

    /**
     * Relacionamento: Uma disciplina pertence a muitos alunos através de matrículas
     */
    public function alunos()
    {
        return $this->belongsToMany(Aluno::class, 'matriculas', 'disciplina_id', 'aluno_numero_matricula', 'id', 'numero_matricula');
    }

    /**
     * Accessor para contar alunos matriculados
     */
    public function getTotalAlunosAttribute()
    {
        return $this->matriculas()->ativas()->count();
    }

    /**
     * Accessor para média de notas da disciplina
     */
    public function getMediaNotasAttribute()
    {
        $notas = $this->matriculas()->whereNotNull('nota')->pluck('nota');
        return $notas->count() > 0 ? $notas->avg() : null;
    }
}
