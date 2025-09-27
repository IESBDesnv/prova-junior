import { useState, useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InfantilButton from '@/Components/InfantilButton';
import InfantilInput from '@/Components/InfantilInput';
import InfantilLayout from '@/Layouts/InfantilLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const [emailError, setEmailError] = useState('');
    
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
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

        post(route('login'), {
            onFinish: () => {
                reset('password');
            }
        });
    };

    return (
        <InfantilLayout>
            <Head title="Entrar na Escola" />

            {/* Título da página */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary mb-2">
                    Bem-vindo de volta!
                </h2>
                <p className="text-gray-600">
                    Entre na sua conta
                </p>
            </div>

            {status && (
                <div className="mb-6 p-4 bg-success/20 border-2 border-success/50 rounded-2xl text-sm font-bold text-success">
                    {status}
                </div>
            )}

            {/* Erro geral de login */}
            {errors.email && errors.email.includes('credentials') && (
                <div className="mb-6 p-4 bg-danger/20 border-2 border-danger/50 rounded-2xl text-sm font-bold text-danger">
                    E-mail ou senha incorretos. Verifique e tente novamente.
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
                        autoComplete="username"
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

                {/* Campo de Senha */}
                <div>
                    <label htmlFor="password" className="block text-sm font-bold text-blue-600 mb-2">
                        Sua senha
                    </label>
                    <InfantilInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="Digite sua senha aqui..."
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2 text-danger text-sm font-medium" />
                </div>

                {/* Checkbox Lembrar */}
                <div className="flex items-center">
                    <Checkbox
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData('remember', e.target.checked)}
                        className="rounded border-2 border-primary/50 text-primary focus:ring-primary/30"
                    />
                    <label className="ml-3 text-sm font-bold text-blue-600">
                        Lembrar de mim
                    </label>
                </div>

                    {/* Botões */}
                    <div className="space-y-4">
                        <InfantilButton
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            disabled={processing}
                        >
                            {processing ? 'Entrando...' : 'Entrar na Escola'}
                        </InfantilButton>

                    {canResetPassword && (
                        <div className="text-center">
                            <Link
                                href={route('password.request')}
                                className="text-sm text-warning hover:text-primary font-medium transition-colors duration-300"
                            >
                                Esqueceu sua senha?
                            </Link>
                        </div>
                    )}
                </div>
            </form>

            {/* Link para registro */}
            <div className="mt-8 text-center">
                <p className="text-primary/70 text-sm mb-2">
                    Ainda não tem uma conta?
                </p>
                <Link
                    href={route('register')}
                    className="inline-flex items-center text-warning hover:text-primary font-bold transition-colors duration-300"
                >
                    Criar conta nova! ✨
                </Link>
            </div>

        </InfantilLayout>
    );
}
