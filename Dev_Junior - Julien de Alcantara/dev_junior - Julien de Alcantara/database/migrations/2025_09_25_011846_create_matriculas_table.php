<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('matriculas', function (Blueprint $table) {
            $table->id();
            $table->string('aluno_numero_matricula'); // Referência ao número de matrícula do aluno
            $table->foreignId('disciplina_id')->constrained()->onDelete('cascade');
            $table->date('data_matricula');
            $table->enum('status', ['ativa', 'inativa', 'concluida'])->default('ativa');
            $table->decimal('nota', 3, 1)->nullable(); // Nota de 0.0 a 10.0
            $table->text('observacoes')->nullable();
            $table->timestamps();
            
            // Chave estrangeira para o número de matrícula do aluno
            $table->foreign('aluno_numero_matricula')->references('numero_matricula')->on('alunos')->onDelete('cascade');
            
            // Evitar matrícula duplicada do mesmo aluno na mesma disciplina
            $table->unique(['aluno_numero_matricula', 'disciplina_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('matriculas');
    }
};
