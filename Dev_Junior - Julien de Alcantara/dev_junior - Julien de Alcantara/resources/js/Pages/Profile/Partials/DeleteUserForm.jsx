import InputError from '@/Components/InputError';
import InfantilButton from '@/Components/InfantilButton';
import InfantilInput from '@/Components/InfantilInput';
import InfantilConfirmationModal from '@/Components/InfantilConfirmationModal';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header className="mb-8">
                <h2 className="text-xl font-bold text-danger mb-2 flex items-center">
                    🗑️ Excluir Conta
                </h2>
                <p className="text-gray-600">
                    Uma vez que sua conta for excluída, todos os recursos e dados serão permanentemente removidos. 
                    Antes de excluir sua conta, faça o download de qualquer dado ou informação que deseja manter.
                </p>
            </header>

            <InfantilButton 
                variant="danger" 
                size="lg"
                onClick={confirmUserDeletion}
            >
                Excluir Minha Conta
            </InfantilButton>

            <InfantilConfirmationModal
                isOpen={confirmingUserDeletion}
                onClose={closeModal}
                onConfirm={deleteUser}
                title="Confirmar Exclusão da Conta"
                message="Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita e todos os seus dados serão permanentemente removidos."
                confirmText="Sim, excluir conta"
                cancelText="Cancelar"
                type="danger"
            >
                <div className="mt-6">
                    <label htmlFor="password" className="block text-sm font-bold text-blue-600 mb-2">
                        Digite sua senha para confirmar
                    </label>
                    <InfantilInput
                        id="password"
                        type="password"
                        name="password"
                        ref={passwordInput}
                        value={data.password}
                        placeholder="Digite sua senha aqui..."
                        onChange={(e) => setData('password', e.target.value)}
                        autoFocus
                        required
                    />
                    <InputError message={errors.password} className="mt-2 text-danger text-sm font-medium" />
                </div>
            </InfantilConfirmationModal>
        </section>
    );
}