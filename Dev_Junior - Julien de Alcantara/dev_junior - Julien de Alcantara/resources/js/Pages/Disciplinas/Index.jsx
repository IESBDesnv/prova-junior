import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import InfantilButton from '@/Components/InfantilButton';
import InfantilAuthenticatedLayout from '@/Layouts/InfantilAuthenticatedLayout';
import InfantilConfirmationModal from '@/Components/InfantilConfirmationModal';
import InfantilSuccessModal from '@/Components/InfantilSuccessModal';

export default function Index({ disciplinas, filters }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [disciplinaToDelete, setDisciplinaToDelete] = useState(null);
    
    // Debug do estado
    useEffect(() => {
        console.log('Estado atualizado - showDeleteModal:', showDeleteModal, 'disciplinaToDelete:', disciplinaToDelete);
    }, [showDeleteModal, disciplinaToDelete]);
    
    // Garantindo que os dados nunca sejam null/undefined
    const safeDisciplinas = disciplinas || { data: [], links: [] };
    const safeFilters = filters || { search: '', status: '' };
    
    const { data, setData, get, delete: destroy } = useForm({
        search: safeFilters.search || '',
        status: safeFilters.status || '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        get(route('disciplinas.index'), {
            preserveState: true,
            replace: true,
        });
    };

    const resetFilters = () => {
        setData({
            search: '',
            status: '',
        });
        get(route('disciplinas.index'), {
            preserveState: true,
            replace: true,
        });
    };

    const handleDeleteClick = (disciplina) => {
        console.log('handleDeleteClick chamado com disciplina:', disciplina);
        setDisciplinaToDelete(disciplina);
        setShowDeleteModal(true);
        console.log('showDeleteModal definido como true');
    };

    const handleDeleteConfirm = () => {
        console.log('handleDeleteConfirm chamado com disciplina:', disciplinaToDelete);
        if (disciplinaToDelete) {
            // Fechar modal de confirmação
            setShowDeleteModal(false);
            
            // Fazer a exclusão e atualizar a página
            destroy(route('disciplinas.destroy', disciplinaToDelete.id), {
                preserveState: false, // Força atualização da página
                preserveScroll: false, // Não preserva scroll
                onSuccess: () => {
                    console.log('Disciplina excluída com sucesso!');
                    // Mostrar modal de sucesso após exclusão
                    setShowSuccessModal(true);
                },
                onError: (errors) => {
                    console.error('Erro ao excluir disciplina:', errors);
                    alert('Erro ao excluir disciplina. Tente novamente.');
                }
            });
            
            setDisciplinaToDelete(null);
        }
    };

    const handleDeleteCancel = () => {
        console.log('handleDeleteCancel chamado');
        setShowDeleteModal(false);
        setDisciplinaToDelete(null);
    };

    return (
        <InfantilAuthenticatedLayout>
            <Head title="Disciplinas" />

            <div className="min-h-screen bg-gradient-to-br from-card-bg via-surface to-accent/10">
                {/* Header */}
                <div className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-text-primary flex items-center">
                                    🎓 Nossas Disciplinas
                                </h1>
                                <p className="text-text-secondary mt-1">
                                    Gerencie as disciplinas da nossa escola criativa
                                </p>
                            
                            </div>
                    <div className="flex gap-4">
                       
                        <Link href={route('disciplinas.create')}>
                            <InfantilButton variant="primary" size="lg">
                                ➕ Nova Disciplina
                            </InfantilButton>
                        </Link>
                    </div>
                        </div>
                    </div>
                </div>

                {/* Filtros e Busca */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border-2 border-primary/20">
                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Campo de Busca */}
                            <div>
                                <label className="block text-sm font-bold text-primary mb-2">
                                    🔍 Buscar por Nome ou Código
                                </label>
                                <input
                                    type="text"
                                    value={data.search || ''}
                                    placeholder="Ex: Matemática ou MAT001"
                                    className="w-full px-4 py-3 rounded-2xl border-2 border-primary/30 bg-white/80 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                    onChange={(e) => setData('search', e.target.value || '')}
                                />
                            </div>

                            {/* Filtro por Status */}
                            <div>
                                <label className="block text-sm font-bold text-primary mb-2">
                                    📊 Status
                                </label>
                                <select
                                    value={data.status || ''}
                                    className="w-full px-4 py-3 rounded-2xl border-2 border-primary/30 bg-white/80 text-gray-700 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all duration-300"
                                    onChange={(e) => setData('status', e.target.value || '')}
                                >
                                    <option value="">Todas as disciplinas</option>
                                    <option value="ativa">✅ Apenas ativas</option>
                                    <option value="inativa">⏸️ Apenas inativas</option>
                                </select>
                            </div>

                            {/* Botões de Ação */}
                            <div className="flex items-end gap-2">
                                <InfantilButton type="submit" variant="secondary" size="md" className="flex-1">
                                    🔍 Buscar
                                </InfantilButton>
                                <InfantilButton type="button" variant="outline" size="md" onClick={resetFilters} className="flex-1">
                                    🔄 Limpar
                                </InfantilButton>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Lista de Disciplinas */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
                    {safeDisciplinas.data && safeDisciplinas.data.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {safeDisciplinas.data.map((disciplina) => {
                                // Garantindo que disciplina nunca seja null
                                if (!disciplina || !disciplina.id) return null;
                                
                                return (
                                        <div
                                            key={disciplina.id}
                                            className="bg-surface backdrop-blur-sm rounded-3xl p-6 shadow-lg border-2 border-card-border hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                                        >
                                        {/* Header do Card */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="text-4xl">
                                                📚
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                disciplina.ativa === true || disciplina.ativa === 1
                                                    ? 'bg-success/20 text-success border border-success/30'
                                                    : 'bg-warning/20 text-warning border border-warning/30'
                                            }`}>
                                                {disciplina.ativa === true || disciplina.ativa === 1 ? '✅ Ativa' : '⏸️ Inativa'}
                                            </div>
                                        </div>

                                        {/* Conteúdo */}
                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-text-primary mb-2">
                                                {disciplina.nome || 'Nome não definido'}
                                            </h3>
                                            <p className="text-text-secondary text-sm mb-2">
                                                <strong>🏷️ Código:</strong> {disciplina.codigo || 'N/A'}
                                            </p>
                                            <p className="text-text-secondary text-sm">
                                                <strong>⏰ Carga Horária:</strong> {disciplina.carga_horaria || 0} horas
                                            </p>
                                        </div>

                                        {/* Ações */}
                                        <div className="flex gap-1 lg:justify-end" role="group" aria-label={`Ações para disciplina ${disciplina.nome}`}>
                                            <Link
                                                href={route('disciplinas.show', disciplina.id)}
                                                className="flex-1 lg:flex-none"
                                            >
                                                <InfantilButton 
                                                    variant="accent" 
                                                    size="xs" 
                                                    className="w-full h-8 lg:w-auto lg:px-3"
                                                    ariaLabel={`Ver detalhes da disciplina ${disciplina.nome}`}
                                                >
                                                    <span className="lg:hidden">👁️ Ver</span>
                                                    <span className="hidden lg:inline">👁️ Ver</span>
                                                </InfantilButton>
                                            </Link>
                                            <Link
                                                href={route('disciplinas.edit', disciplina.id)}
                                                className="flex-1 lg:flex-none"
                                            >
                                                <InfantilButton 
                                                    variant="secondary" 
                                                    size="xs" 
                                                    className="w-full h-8 lg:w-auto lg:px-3"
                                                    ariaLabel={`Editar disciplina ${disciplina.nome}`}
                                                >
                                                    <span className="lg:hidden">✏️ Editar</span>
                                                    <span className="hidden lg:inline">✏️</span>
                                                </InfantilButton>
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(disciplina)}
                                                className="flex-1 lg:flex-none"
                                            >
                                                <InfantilButton 
                                                    variant="danger" 
                                                    size="xs" 
                                                    className="w-full h-8 lg:w-auto lg:px-3"
                                                    ariaLabel={`Excluir disciplina ${disciplina.nome}`}
                                                >
                                                    <span className="lg:hidden">🗑️ Excluir</span>
                                                    <span className="hidden lg:inline">🗑️</span>
                                                </InfantilButton>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">📚</div>
                                <h3 className="text-2xl font-bold text-text-primary mb-2">
                                    Nenhuma disciplina encontrada
                                </h3>
                                <p className="text-text-secondary mb-6">
                                    Que tal criar a primeira disciplina da nossa escola?
                                </p>
                            <Link href={route('disciplinas.create')}>
                                <InfantilButton variant="primary" size="lg">
                                    ➕ Criar Primeira Disciplina
                                </InfantilButton>
                            </Link>
                        </div>
                    )}

                    {/* Informações de Paginação */}
                    {safeDisciplinas.data && safeDisciplinas.data.length > 0 && (
                        <div className="mt-6 text-center">
                            <p className="text-text-secondary text-sm mb-4">
                                Mostrando {safeDisciplinas.data.length} de {safeDisciplinas.total || 0} disciplinas
                            </p>
                        </div>
                    )}

                    {/* Paginação */}
                    {safeDisciplinas.links && safeDisciplinas.links.length > 0 && (
                        <div className="mt-4 flex justify-center">
                            <div className="flex flex-wrap justify-center gap-2">
                                {safeDisciplinas.links.map((link, index) => {
                                    if (!link) return null;
                                    
                                    return link.url ? (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            className={`px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 ${
                                                link.active
                                                    ? 'bg-primary text-white shadow-lg'
                                                    : 'bg-surface text-text-primary hover:bg-primary hover:text-white border border-card-border'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label || '' }}
                                        />
                                    ) : (
                                        <span
                                            key={index}
                                            className="px-4 py-2 rounded-2xl text-sm font-medium text-text-muted cursor-default"
                                            dangerouslySetInnerHTML={{ __html: link.label || '' }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal de Confirmação de Exclusão */}
                {console.log('Renderizando modal - showDeleteModal:', showDeleteModal, 'disciplinaToDelete:', disciplinaToDelete)}
                
                {/* Modal de teste simples */}
                {showDeleteModal && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-4">
                            <h3 className="text-lg font-bold mb-4">Confirmar Exclusão</h3>
                            <p className="mb-4">
                                Tem certeza que deseja excluir a disciplina "{disciplinaToDelete?.nome}"? 
                                Esta ação não pode ser desfeita!
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDeleteCancel}
                                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleDeleteConfirm}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Sim, excluir
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                
                <InfantilConfirmationModal
                    isOpen={showDeleteModal}
                    onClose={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                    title="Confirmar Exclusão"
                    message={`Tem certeza que deseja excluir a disciplina "${disciplinaToDelete?.nome}"? Esta ação não pode ser desfeita!`}
                    confirmText="Sim, excluir"
                    cancelText="Cancelar"
                    type="danger"
                />

                {/* Modal de Sucesso */}
                <InfantilSuccessModal
                    isOpen={showSuccessModal}
                    onClose={() => {
                        setShowSuccessModal(false);
                        // Recarregar a página para atualizar a lista
                        window.location.reload();
                    }}
                    title="Disciplina Excluída!"
                    message="A disciplina foi excluída com sucesso! 🗑️"
                    type="success"
                />

            </div>
        </InfantilAuthenticatedLayout>
    );
}
