import { Head, Link } from '@inertiajs/react';
import InfantilButton from '@/Components/InfantilButton';
import InfantilAuthenticatedLayout from '@/Layouts/InfantilAuthenticatedLayout';

export default function Show({ disciplina }) {
    // Debug: verificar se os dados estão chegando
    console.log('Disciplina recebida:', disciplina);
    
    // Se não há disciplina, mostrar erro
    if (!disciplina) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600">Erro: Disciplina não encontrada</h1>
                    <p className="text-gray-600">Os dados da disciplina não foram carregados.</p>
                </div>
            </div>
        );
    }
    
    return (
        <InfantilAuthenticatedLayout>
            <Head title={`Disciplina: ${disciplina.nome}`} />

            <div className="min-h-screen bg-gradient-to-br from-color-2 via-color-4 to-info/30">
                {/* Header */}
                <div className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-primary flex items-center">
                                    📚 {disciplina.nome}
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Detalhes da disciplina
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <Link href={route('disciplinas.edit', disciplina.id)}>
                                    <InfantilButton variant="secondary" size="md">
                                        ✏️ Editar
                                    </InfantilButton>
                                </Link>
                                <Link href={route('disciplinas.index')}>
                                    <InfantilButton variant="outline" size="md">
                                        🔙 Voltar
                                    </InfantilButton>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conteúdo Principal */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-primary/20">
                        {/* Card Principal */}
                        <div className="text-center mb-8">
                            <div className="text-8xl mb-4">📚</div>
                            <h2 className="text-4xl font-bold text-primary mb-2">
                                {disciplina.nome}
                            </h2>
                            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                                disciplina.ativa 
                                    ? 'bg-success/20 text-success border border-success/30' 
                                    : 'bg-warning/20 text-warning border border-warning/30'
                            }`}>
                                {disciplina.ativa ? '✅ Disciplina Ativa' : '⏸️ Disciplina Inativa'}
                            </div>
                        </div>

                        {/* Informações Detalhadas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            {/* Código */}
                            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border-2 border-primary/20">
                                <div className="text-center">
                                    <div className="text-3xl mb-2">🏷️</div>
                                    <h3 className="text-lg font-bold text-primary mb-2">Código</h3>
                                    <p className="text-2xl font-bold text-gray-700">{disciplina.codigo}</p>
                                </div>
                            </div>

                            {/* Carga Horária */}
                            <div className="bg-gradient-to-br from-success/10 to-success/5 rounded-2xl p-6 border-2 border-success/20">
                                <div className="text-center">
                                    <div className="text-3xl mb-2">⏰</div>
                                    <h3 className="text-lg font-bold text-success mb-2">Carga Horária</h3>
                                    <p className="text-2xl font-bold text-gray-700">{disciplina.carga_horaria} horas</p>
                                </div>
                            </div>
                        </div>

                        {/* Informações Adicionais */}
                        <div className="bg-gradient-to-br from-info/10 to-info/5 rounded-2xl p-6 border-2 border-info/20 mb-8">
                            <h3 className="text-xl font-bold text-info mb-4 text-center">
                                📋 Informações da Disciplina
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-bold text-gray-600 mb-1">Data de Criação:</p>
                                    <p className="text-gray-800">{new Date(disciplina.created_at).toLocaleDateString('pt-BR')}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-600 mb-1">Última Atualização:</p>
                                    <p className="text-gray-800">{new Date(disciplina.updated_at).toLocaleDateString('pt-BR')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Ações */}
                        <div className="flex gap-4 justify-center">
                            <Link href={route('disciplinas.edit', disciplina.id)}>
                                <InfantilButton variant="secondary" size="lg">
                                    ✏️ Editar Disciplina
                                </InfantilButton>
                            </Link>
                            
                            <Link href={route('disciplinas.index')}>
                                <InfantilButton variant="accent" size="lg">
                                    📚 Ver Todas as Disciplinas
                                </InfantilButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </InfantilAuthenticatedLayout>
    );
}
