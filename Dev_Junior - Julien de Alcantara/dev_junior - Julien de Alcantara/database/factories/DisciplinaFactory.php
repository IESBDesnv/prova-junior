<?php

namespace Database\Factories;

use App\Models\Disciplina;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Disciplina>
 */
class DisciplinaFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Disciplina::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nomes = [
            'Matemática Básica',
            'Português',
            'História do Brasil',
            'Geografia',
            'Ciências Naturais',
            'Educação Física',
            'Artes',
            'Inglês',
            'Espanhol',
            'Física',
            'Química',
            'Biologia',
            'Filosofia',
            'Sociologia',
            'Literatura Brasileira',
            'Redação',
            'Informática',
            'Robótica',
            'Programação',
            'Design Gráfico'
        ];

        // Gerar código único automaticamente
        $codigo = strtoupper($this->faker->unique()->lexify('???') . $this->faker->unique()->numerify('###'));

        return [
            'nome' => $this->faker->randomElement($nomes),
            'codigo' => $codigo,
            'carga_horaria' => $this->faker->numberBetween(20, 120),
            'ativa' => $this->faker->boolean(85), // 85% de chance de ser ativa
        ];
    }

    /**
     * Indicate that the disciplina is active.
     */
    public function ativa(): static
    {
        return $this->state(fn (array $attributes) => [
            'ativa' => true,
        ]);
    }

    /**
     * Indicate that the disciplina is inactive.
     */
    public function inativa(): static
    {
        return $this->state(fn (array $attributes) => [
            'ativa' => false,
        ]);
    }

    /**
     * Indicate that the disciplina has a specific carga horaria.
     */
    public function comCargaHoraria(int $cargaHoraria): static
    {
        return $this->state(fn (array $attributes) => [
            'carga_horaria' => $cargaHoraria,
        ]);
    }
}