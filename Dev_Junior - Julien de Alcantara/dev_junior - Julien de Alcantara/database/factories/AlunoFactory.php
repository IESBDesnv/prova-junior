<?php

namespace Database\Factories;

use App\Models\Aluno;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Aluno>
 */
class AlunoFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Aluno::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $nomes = [
            'Ana Beatriz Silva',
            'Carlos Eduardo Santos',
            'Maria Fernanda Oliveira',
            'João Pedro Costa',
            'Larissa Mendes',
            'Rafael Almeida',
            'Camila Rodrigues',
            'Diego Pereira',
            'Isabella Fernandes',
            'Lucas Martins',
            'Gabriela Souza',
            'Felipe Rocha',
            'Amanda Lima',
            'Bruno Carvalho',
            'Juliana Castro',
            'Thiago Nunes',
            'Beatriz Araújo',
            'Pedro Henrique',
            'Mariana Dias',
            'André Luiz'
        ];

        $numeroMatricula = '2024' . str_pad($this->faker->unique()->numberBetween(1, 9999), 4, '0', STR_PAD_LEFT);

        return [
            'numero_matricula' => $numeroMatricula,
            'nome' => $this->faker->randomElement($nomes),
            'email' => $this->faker->unique()->safeEmail(),
            'data_nascimento' => $this->faker->dateTimeBetween('-18 years', '-6 years'),
            'telefone' => $this->faker->numerify('(##) #####-####'),
            'cpf' => $this->faker->unique()->numerify('###.###.###-##'),
            'ativo' => $this->faker->boolean(90), // 90% de chance de ser ativo
        ];
    }

    /**
     * Indicate that the aluno is active.
     */
    public function ativo(): static
    {
        return $this->state(fn (array $attributes) => [
            'ativo' => true,
        ]);
    }

    /**
     * Indicate that the aluno is inactive.
     */
    public function inativo(): static
    {
        return $this->state(fn (array $attributes) => [
            'ativo' => false,
        ]);
    }

    /**
     * Indicate that the aluno has a specific age.
     */
    public function comIdade(int $idade): static
    {
        $dataNascimento = Carbon::now()->subYears($idade);
        return $this->state(fn (array $attributes) => [
            'data_nascimento' => $dataNascimento,
        ]);
    }

    /**
     * Indicate that the aluno has a specific numero_matricula.
     */
    public function comMatricula(string $numeroMatricula): static
    {
        return $this->state(fn (array $attributes) => [
            'numero_matricula' => $numeroMatricula,
        ]);
    }
}