<?php

namespace Database\Factories;

use App\Models\Matricula;
use App\Models\Aluno;
use App\Models\Disciplina;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Matricula>
 */
class MatriculaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Matricula::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement(['ativa', 'inativa', 'concluida']);
        
        // Se for concluída, gerar uma nota
        $nota = null;
        if ($status === 'concluida') {
            $nota = $this->faker->randomFloat(1, 0, 10);
        }

        return [
            'aluno_numero_matricula' => Aluno::factory(),
            'disciplina_id' => Disciplina::factory(),
            'data_matricula' => $this->faker->dateTimeBetween('-2 years', 'now'),
            'status' => $status,
            'nota' => $nota,
            'observacoes' => $this->faker->optional(0.3)->sentence(),
        ];
    }

    /**
     * Indicate that the matricula is active.
     */
    public function ativa(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'ativa',
            'nota' => null,
        ]);
    }

    /**
     * Indicate that the matricula is inactive.
     */
    public function inativa(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inativa',
            'nota' => null,
        ]);
    }

    /**
     * Indicate that the matricula is completed.
     */
    public function concluida(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'concluida',
            'nota' => $this->faker->randomFloat(1, 0, 10),
        ]);
    }

    /**
     * Indicate that the matricula has a specific nota.
     */
    public function comNota(float $nota): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'concluida',
            'nota' => $nota,
        ]);
    }

    /**
     * Indicate that the matricula has a specific aluno.
     */
    public function comAluno(string $numeroMatricula): static
    {
        return $this->state(fn (array $attributes) => [
            'aluno_numero_matricula' => $numeroMatricula,
        ]);
    }

    /**
     * Indicate that the matricula has a specific disciplina.
     */
    public function comDisciplina(int $disciplinaId): static
    {
        return $this->state(fn (array $attributes) => [
            'disciplina_id' => $disciplinaId,
        ]);
    }
}