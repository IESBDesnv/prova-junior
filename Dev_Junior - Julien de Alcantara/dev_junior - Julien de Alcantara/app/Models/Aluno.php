<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Aluno extends Model
{
    use HasFactory;

    /**
     * A chave primária não é auto-incremento
     */
    public $incrementing = false;

    /**
     * Tipo da chave primária
     */
    protected $keyType = 'string';

    /**
     * A chave primária da tabela
     */
    protected $primaryKey = 'numero_matricula';

    /**
     * Atributos que podem ser preenchidos em massa
     */
    protected $fillable = [
        'numero_matricula',
        'nome',
        'email',
        'data_nascimento',
        'telefone',
        'cpf',
        'ativo',
    ];

    /**
     * Atributos que devem ser convertidos
     */
    protected $casts = [
        'data_nascimento' => 'date',
        'ativo' => 'boolean',
    ];

    /**
     * Relacionamento: Um aluno tem muitas matrículas
     */
    public function matriculas()
    {
        return $this->hasMany(Matricula::class, 'aluno_numero_matricula', 'numero_matricula');
    }

    /**
     * Relacionamento: Um aluno pertence a muitas disciplinas através de matrículas
     */
    public function disciplinas()
    {
        return $this->belongsToMany(Disciplina::class, 'matriculas', 'aluno_numero_matricula', 'disciplina_id', 'numero_matricula', 'id');
    }

    /**
     * Scope para alunos ativos
     */
    public function scopeAtivos($query)
    {
        return $query->where('ativo', true);
    }

    /**
     * Scope para alunos inativos
     */
    public function scopeInativos($query)
    {
        return $query->where('ativo', false);
    }

    /**
     * Scope para buscar por nome
     */
    public function scopePorNome($query, $nome)
    {
        return $query->where('nome', 'like', "%{$nome}%");
    }

    /**
     * Scope para buscar por email
     */
    public function scopePorEmail($query, $email)
    {
        return $query->where('email', 'like', "%{$email}%");
    }

    /**
     * Accessor para formatação do status
     */
    public function getStatusFormatadoAttribute()
    {
        return $this->ativo ? 'Ativo' : 'Inativo';
    }

    /**
     * Accessor para formatação da idade
     */
    public function getIdadeAttribute()
    {
        return $this->data_nascimento->age;
    }

    /**
     * Accessor para formatação do telefone
     */
    public function getTelefoneFormatadoAttribute()
    {
        $telefone = preg_replace('/\D/', '', $this->telefone);
        return '(' . substr($telefone, 0, 2) . ') ' . substr($telefone, 2, 5) . '-' . substr($telefone, 7);
    }
}
