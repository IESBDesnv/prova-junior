<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDisciplinaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $disciplinaId = $this->route('disciplina')->id;
        
        return [
            'nome' => 'required|string|max:255|min:3',
            'codigo' => [
                'required',
                'string',
                'max:10',
                'min:3',
                Rule::unique('disciplinas', 'codigo')->ignore($disciplinaId),
            ],
            'carga_horaria' => 'required|integer|min:1|max:9999',
            'ativa' => 'boolean',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'nome.required' => 'O nome da disciplina é obrigatório.',
            'nome.min' => 'O nome da disciplina deve ter pelo menos 3 caracteres.',
            'nome.max' => 'O nome da disciplina não pode ter mais de 255 caracteres.',
            'codigo.required' => 'O código da disciplina é obrigatório.',
            'codigo.min' => 'O código da disciplina deve ter pelo menos 3 caracteres.',
            'codigo.max' => 'O código da disciplina não pode ter mais de 10 caracteres.',
            'codigo.unique' => 'Este código já está sendo usado por outra disciplina.',
            'carga_horaria.required' => 'A carga horária é obrigatória.',
            'carga_horaria.integer' => 'A carga horária deve ser um número inteiro.',
            'carga_horaria.min' => 'A carga horária deve ser pelo menos 1 hora.',
            'carga_horaria.max' => 'A carga horária não pode ser maior que 9999 horas.',
        ];
    }
}
