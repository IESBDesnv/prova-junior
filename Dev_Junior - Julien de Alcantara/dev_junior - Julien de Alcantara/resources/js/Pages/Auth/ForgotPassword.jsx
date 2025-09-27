import { useState } from 'react';
import InputError from '@/Components/InputError';
import InfantilButton from '@/Components/InfantilButton';
import InfantilInput from '@/Components/InfantilInput';
import InfantilLayout from '@/Layouts/InfantilLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const [emailError, setEmailError] = useState('');
    
    const { data, setData, post, processing, errors } = useForm({
        email: '',
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

        post(route('password.email'));
    };

    return (
        <InfantilLayout>
            <Head title="Recuperar Senha" />

            {/* Título da página */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary mb-2">
                    Esqueceu sua senha? 🤔
                </h2>
                <p className="text-gray-600">
                    Não se preocupe! Vamos te ajudar a recuperar
                </p>
            </div>

            {status && (
                <div className="mb-6 p-4 bg-success/20 border-2 border-success/50 rounded-2xl text-sm font-bold text-success">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                {/* Campo de Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-bold text-blue-600 mb-2">
                        Seu e-mail
                    </label>
                    <InfantilInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="Digite seu e-mail aqui..."
                        autoComplete="email"
                        autoFocus={true}
                        onChange={handleEmailChange}
                        className={emailError ? 'border-danger focus:border-danger focus:ring-danger/20' : ''}
                    />
                    {emailError && (
                        <div className="mt-2 text-danger text-sm font-medium">
                            {emailError}
                        </div>
                    )}
                    <InputError message={errors.email} className="mt-2 text-danger text-sm font-medium" />
                </div>

                {/* Botão de Envio */}
                <div className="space-y-4">
                    <InfantilButton
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                        disabled={processing || emailError}
                    >
                        {processing ? 'Enviando...' : 'Enviar Link de Recuperação'}
                    </InfantilButton>
                </div>
            </form>

            {/* Link para voltar ao login */}
            <div className="mt-8 text-center">
                <p className="text-primary/70 text-sm mb-2">
                    Lembrou da senha?
                </p>
                <Link
                    href={route('login')}
                    className="inline-flex items-center text-warning hover:text-primary font-bold transition-colors duration-300"
                >
                    Voltar ao login ✨
                </Link>
            </div>
        </InfantilLayout>
    );
}
