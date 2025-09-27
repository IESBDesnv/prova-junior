import { Head, Link } from '@inertiajs/react';
import InfantilAuthenticatedLayout from '@/Layouts/InfantilAuthenticatedLayout';

export default function Dashboard({ 
    estatisticas, 
    disciplinasPopulares 
}) {
    return (
        <InfantilAuthenticatedLayout
            header={
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-primary mb-2">
                        📊 Dashboard
                    </h2>
                    <p className="text-gray-600">
                        Visão geral do sistema escolar
                    </p>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-surface rounded-3xl p-6 shadow-lg border-2 border-primary/20">
                        <div className="text-center">
                            <div className="text-4xl mb-2">👥</div>
                            <h3 className="text-lg font-bold text-primary">Alunos</h3>
                            <p className="text-3xl font-bold text-success">{estatisticas?.total_alunos || 0}</p>
                        </div>
                    </div>

                    <div className="bg-surface rounded-3xl p-6 shadow-lg border-2 border-info/20">
                        <div className="text-center">
                            <div className="text-4xl mb-2">📚</div>
                            <h3 className="text-lg font-bold text-info">Disciplinas</h3>
                            <p className="text-3xl font-bold text-info">{estatisticas?.total_disciplinas || 0}</p>
                        </div>
                    </div>

                    <div className="bg-surface rounded-3xl p-6 shadow-lg border-2 border-warning/20">
                        <div className="text-center">
                            <div className="text-4xl mb-2">📝</div>
                            <h3 className="text-lg font-bold text-warning">Matrículas</h3>
                            <p className="text-3xl font-bold text-warning">{estatisticas?.total_matriculas || 0}</p>
                        </div>
                    </div>
                </div>


                {/* Disciplinas Populares */}
                {disciplinasPopulares && disciplinasPopulares.length > 0 && (
                    <div className="mt-8">
                        <div className="bg-surface rounded-3xl p-6 shadow-lg border-2 border-card-border">
                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                                🏆 Disciplinas Mais Populares
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {disciplinasPopulares.map((disciplina, index) => (
                                    <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200">
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-lg text-gray-800">
                                                {disciplina.nome}
                                            </h4>
                                            <span className="text-2xl">
                                                {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <span className="font-semibold text-primary">{disciplina.alunos}</span> alunos matriculados
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Ações Rápidas */}
                <div className="mt-8">
                    <div className="bg-surface rounded-3xl p-6 shadow-lg border-2 border-primary/20">
                        <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                            ⚡ Ações Rápidas
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href="/disciplinas" className="group">
                                <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                                    <div className="flex items-center">
                                        <div className="text-2xl mr-3">📚</div>
                                        <div>
                                            <h4 className="font-bold">Gerenciar Disciplinas</h4>
                                            <p className="text-sm opacity-90">Criar e editar disciplinas</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            
                            <Link href="/relatorios" className="group">
                                <div className="bg-gradient-to-r from-success to-success/80 text-white p-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                                    <div className="flex items-center">
                                        <div className="text-2xl mr-3">📊</div>
                                        <div>
                                            <h4 className="font-bold">Relatórios</h4>
                                            <p className="text-sm opacity-90">Ver relatórios detalhados</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            
                            <Link href="/profile" className="group">
                                <div className="bg-gradient-to-r from-warning to-warning/80 text-white p-4 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg">
                                    <div className="flex items-center">
                                        <div className="text-2xl mr-3">👤</div>
                                        <div>
                                            <h4 className="font-bold">Meu Perfil</h4>
                                            <p className="text-sm opacity-90">Configurações da conta</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center py-8">
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-primary/20">
                        <h4 className="text-lg font-bold text-primary mb-2">🎓 Sistema de Gestão Educacional</h4>
                        <p className="text-gray-600 mb-4">
                            Dashboard atualizado em tempo real • Última atualização: {new Date().toLocaleString('pt-BR')}
                        </p>
                    </div>
                </div>
            </div>
        </InfantilAuthenticatedLayout>
    );
}