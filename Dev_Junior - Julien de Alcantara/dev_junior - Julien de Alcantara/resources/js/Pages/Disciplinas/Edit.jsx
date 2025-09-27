import { Head, useForm } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import InfantilButton from '@/Components/InfantilButton';
import InfantilInput from '@/Components/InfantilInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import InfantilAuthenticatedLayout from '@/Layouts/InfantilAuthenticatedLayout';
import InfantilSuccessModal from '@/Components/InfantilSuccessModal';

export default function Edit({ disciplina }) {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    
    // Debug do estado
    useEffect(() => {
        console.log('Edit - showSuccessModal mudou para:', showSuccessModal);
        if (showSuccessModal) {
            console.log('✅ Modal deve estar visível agora!');
        }
    }, [showSuccessModal]);
    
    const { data, setData, put, processing, errors } = useForm({
        nome: disciplina.nome || '',
        codigo: disciplina.codigo || '',
        carga_horaria: disciplina.carga_horaria || '',
        ativa: disciplina.ativa || true,
    });

    const showModal = useCallback(() => {
        console.log('showModal callback executado');
        setShowSuccessModal(true);
    }, []);

    const submit = (e) => {
        e.preventDefault();
        console.log('Editando disciplina...');
        put(route('disciplinas.update', disciplina.id), {
            onSuccess: () => {
                console.log('Sucesso na edição! Mostrando modal...');
                // Usar setTimeout para garantir que o estado seja atualizado
                setTimeout(() => {
                    console.log('Definindo showSuccessModal como true...');
                    showModal();
                }, 100);
            },
            onError: (errors) => {
                console.log('Erro na edição:', errors);
            },
            onFinish: () => {
                console.log('Edição finalizada');
            }
        });
    };

    return (
        <InfantilAuthenticatedLayout>
            <Head title={`Editar: ${disciplina.nome}`} />

            <div className="min-h-screen bg-gradient-to-br from-color-2 via-color-4 to-info/30">
                {/* Header */}
                <div className="bg-white/90 backdrop-blur-sm shadow-lg">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-primary flex items-center">
                                    ✏️ Editar Disciplina
                                </h1>
                                <p className="text-gray-600 mt-1">
                                    Modifique as informações da disciplina: {disciplina.nome}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Formulário */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-primary/20">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Nome da Disciplina */}
                            <div>
                                <InputLabel htmlFor="nome" value="Nome da Disciplina" className="text-lg font-bold text-primary mb-2" />
                                <InfantilInput
                                    id="nome"
                                    type="text"
                                    value={data.nome}
                                    placeholder="Ex: Matemática, Português, Artes..."
                                    className="mt-1"
                                    onChange={(e) => setData('nome', e.target.value)}
                                />
                                <InputError message={errors.nome} className="mt-2" />
                            </div>

                            {/* Código da Disciplina */}
                            <div>
                                <InputLabel htmlFor="codigo" value="Código da Disciplina" className="text-lg font-bold text-primary mb-2" />
                                <InfantilInput
                                    id="codigo"
                                    type="text"
                                    value={data.codigo}
                                    placeholder="Ex: MAT001, POR001, ART001..."
                                    className="mt-1"
                                    onChange={(e) => setData('codigo', e.target.value)}
                                />
                                <InputError message={errors.codigo} className="mt-2" />
                                <p className="text-sm text-gray-600 mt-1">
                                    💡 Dica: Use um código único para identificar a disciplina
                                </p>
                            </div>

                            {/* Carga Horária */}
                            <div>
                                <InputLabel htmlFor="carga_horaria" value="Carga Horária (em horas)" className="text-lg font-bold text-primary mb-2" />
                                <InfantilInput
                                    id="carga_horaria"
                                    type="number"
                                    min="1"
                                    value={data.carga_horaria}
                                    placeholder="Ex: 40, 60, 80..."
                                    className="mt-1"
                                    onChange={(e) => setData('carga_horaria', e.target.value)}
                                />
                                <InputError message={errors.carga_horaria} className="mt-2" />
                                <p className="text-sm text-gray-600 mt-1">
                                    ⏰ Quantas horas esta disciplina terá?
                                </p>
                            </div>

                            {/* Status Ativa/Inativa */}
                            <div>
                                <InputLabel htmlFor="ativa" value="Status da Disciplina" className="text-lg font-bold text-primary mb-2" />
                                <div className="mt-2">
                                    <label className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={data.ativa}
                                            onChange={(e) => setData('ativa', e.target.checked)}
                                            className="w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                                        />
                                        <span className="text-gray-700 font-medium">
                                            {data.ativa ? '✅ Disciplina Ativa' : '⏸️ Disciplina Inativa'}
                                        </span>
                                    </label>
                                </div>
                                <InputError message={errors.ativa} className="mt-2" />
                                <p className="text-sm text-gray-600 mt-1">
                                    📊 Disciplinas ativas aparecem na lista principal
                                </p>
                            </div>

                            {/* Botões */}
                            <div className="flex gap-4 pt-6">
                                <InfantilButton
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                    disabled={processing}
                                    className="flex-1"
                                >
                                    {processing ? 'Salvando...' : '💾 Salvar Alterações'}
                                </InfantilButton>
                                
                                <InfantilButton
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    onClick={() => window.history.back()}
                                    className="flex-1"
                                >
                                    🔙 Cancelar
                                </InfantilButton>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Modal de Sucesso */}
                {console.log('Renderizando Edit - showSuccessModal:', showSuccessModal)}
                <InfantilSuccessModal
                    isOpen={showSuccessModal}
                    onClose={() => {
                        console.log('Fechando modal de sucesso');
                        setShowSuccessModal(false);
                        // Redirecionar para a lista após fechar o modal
                        window.location.href = route('disciplinas.index');
                    }}
                    title="Disciplina Atualizada!"
                    message="A disciplina foi editada com sucesso! ✏️"
                    type="success"
                />
            </div>
        </InfantilAuthenticatedLayout>
    );
}
