import { useState, useRef } from 'react';
import InputError from '@/Components/InputError';
import InfantilButton from '@/Components/InfantilButton';
import InfantilInput from '@/Components/InfantilInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    // Validação em tempo real da senha
    const validatePassword = (password) => {
        if (password && password.length < 8) {
            setPasswordError('A senha deve ter pelo menos 8 caracteres');
        } else {
            setPasswordError('');
        }
    };

    // Validação em tempo real da confirmação de senha
    const validateConfirmPassword = (confirmPassword) => {
        if (confirmPassword && confirmPassword !== data.password) {
            setConfirmPasswordError('As senhas não coincidem');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setData('password', value);
        validatePassword(value);
        // Revalidar confirmação se já foi preenchida
        if (data.password_confirmation) {
            validateConfirmPassword(data.password_confirmation);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setData('password_confirmation', value);
        validateConfirmPassword(value);
    };

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    const hasErrors = passwordError || confirmPasswordError;

    return (
        <section className={className}>
            <header className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-2 flex items-center">
                    🔐 Alterar Senha
                </h2>
                <p className="text-gray-600">
                    Mantenha sua conta segura com uma senha forte e única.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                <div>
                    <label htmlFor="current_password" className="block text-sm font-bold text-blue-600 mb-2">
                        Senha atual
                    </label>
                    <InfantilInput
                        id="current_password"
                        ref={currentPasswordInput}
                        type="password"
                        value={data.current_password}
                        placeholder="Digite sua senha atual..."
                        onChange={(e) => setData('current_password', e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                    <InputError message={errors.current_password} className="mt-2 text-danger text-sm font-medium" />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-bold text-blue-600 mb-2">
                        Nova senha
                    </label>
                    <InfantilInput
                        id="password"
                        ref={passwordInput}
                        type="password"
                        value={data.password}
                        placeholder="Digite sua nova senha..."
                        onChange={handlePasswordChange}
                        autoComplete="new-password"
                        className={passwordError ? 'border-danger focus:border-danger focus:ring-danger/20' : ''}
                        required
                    />
                    {passwordError && (
                        <div className="mt-2 text-danger text-sm font-medium">
                            {passwordError}
                        </div>
                    )}
                    <InputError message={errors.password} className="mt-2 text-danger text-sm font-medium" />
                </div>

                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-bold text-blue-600 mb-2">
                        Confirme a nova senha
                    </label>
                    <InfantilInput
                        id="password_confirmation"
                        type="password"
                        value={data.password_confirmation}
                        placeholder="Digite a nova senha novamente..."
                        onChange={handleConfirmPasswordChange}
                        autoComplete="new-password"
                        className={confirmPasswordError ? 'border-danger focus:border-danger focus:ring-danger/20' : ''}
                        required
                    />
                    {confirmPasswordError && (
                        <div className="mt-2 text-danger text-sm font-medium">
                            {confirmPasswordError}
                        </div>
                    )}
                    <InputError message={errors.password_confirmation} className="mt-2 text-danger text-sm font-medium" />
                </div>

                <div className="flex items-center gap-4">
                    <InfantilButton 
                        type="submit" 
                        variant="primary" 
                        size="md"
                        disabled={processing || hasErrors}
                    >
                        {processing ? 'Alterando...' : 'Alterar Senha'}
                    </InfantilButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-success font-bold">
                            ✅ Senha alterada com sucesso!
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
