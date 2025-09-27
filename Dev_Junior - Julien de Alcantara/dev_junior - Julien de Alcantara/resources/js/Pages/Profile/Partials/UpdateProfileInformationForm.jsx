import { useState } from 'react';
import InputError from '@/Components/InputError';
import InfantilButton from '@/Components/InfantilButton';
import InfantilInput from '@/Components/InfantilInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;
    const [emailError, setEmailError] = useState('');

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    // Validação em tempo real do email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            setEmailError('Por favor, digite um e-mail válido');
        } else {
            setEmailError('');
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setData('email', value);
        validateEmail(value);
    };

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header className="mb-8">
                <h2 className="text-xl font-bold text-primary mb-2 flex items-center">
                    📝 Informações do Perfil
                </h2>
                <p className="text-gray-600">
                    Atualize suas informações pessoais e endereço de e-mail.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-bold text-blue-600 mb-2">
                        Seu nome completo
                    </label>
                    <InfantilInput
                        id="name"
                        value={data.name}
                        placeholder="Digite seu nome aqui..."
                        onChange={(e) => setData('name', e.target.value)}
                        autoComplete="name"
                        autoFocus
                        required
                    />
                    <InputError message={errors.name} className="mt-2 text-danger text-sm font-medium" />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-bold text-blue-600 mb-2">
                        Seu e-mail
                    </label>
                    <InfantilInput
                        id="email"
                        type="email"
                        value={data.email}
                        placeholder="Digite seu e-mail aqui..."
                        onChange={handleEmailChange}
                        autoComplete="username"
                        className={emailError ? 'border-danger focus:border-danger focus:ring-danger/20' : ''}
                        required
                    />
                    {emailError && (
                        <div className="mt-2 text-danger text-sm font-medium">
                            {emailError}
                        </div>
                    )}
                    <InputError message={errors.email} className="mt-2 text-danger text-sm font-medium" />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="p-4 bg-warning/20 border-2 border-warning/50 rounded-2xl">
                        <p className="text-sm text-warning font-bold">
                            Seu endereço de e-mail não foi verificado.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-1 underline hover:text-warning/80 transition-colors duration-300"
                            >
                                Clique aqui para reenviar o e-mail de verificação.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-bold text-success">
                                Um novo link de verificação foi enviado para seu endereço de e-mail.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <InfantilButton 
                        type="submit" 
                        variant="primary" 
                        size="md"
                        disabled={processing || emailError}
                    >
                        {processing ? 'Salvando...' : 'Salvar Alterações'}
                    </InfantilButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-success font-bold">
                            ✅ Salvo com sucesso!
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
