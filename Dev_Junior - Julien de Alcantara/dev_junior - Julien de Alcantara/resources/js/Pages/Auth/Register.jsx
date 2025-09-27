import { useState } from 'react';
import InputError from '@/Components/InputError';
import InfantilButton from '@/Components/InfantilButton';
import InfantilInput from '@/Components/InfantilInput';
import InfantilLayout from '@/Layouts/InfantilLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
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

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setData('email', value);
        validateEmail(value);
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

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const hasErrors = emailError || passwordError || confirmPasswordError;

    return (
        <InfantilLayout>
            <Head title="Criar Conta" />

            {/* Título da página */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary mb-2">
                    Vamos criar sua conta! 🎉
                </h2>
                <p className="text-gray-600">
                    Junte-se à nossa escola criativa
                </p>
            </div>

            <form onSubmit={submit} className="space-y-6">
                {/* Campo de Nome */}
                <div>
                    <label htmlFor="name" className="block text-sm font-bold text-blue-600 mb-2">
                        Seu nome completo
                    </label>
                    <InfantilInput
                        id="name"
                        name="name"
                        value={data.name}
                        placeholder="Digite seu nome aqui..."
                        autoComplete="name"
                        autoFocus={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2 text-danger text-sm font-medium" />
                </div>

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
                        onChange={handleEmailChange}
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
                        autoComplete="new-password"
                        onChange={handlePasswordChange}
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

                {/* Campo de Confirmação de Senha */}
                <div>
                    <label htmlFor="password_confirmation" className="block text-sm font-bold text-blue-600 mb-2">
                        Confirme sua senha
                    </label>
                    <InfantilInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        placeholder="Digite sua senha novamente..."
                        autoComplete="new-password"
                        onChange={handleConfirmPasswordChange}
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

                {/* Botão de Registro */}
                <div className="space-y-4">
                    <InfantilButton
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                        disabled={processing || hasErrors}
                    >
                        {processing ? 'Criando conta...' : 'Criar Minha Conta'}
                    </InfantilButton>
                </div>
            </form>

            {/* Link para voltar ao login */}
            <div className="mt-8 text-center">
                <p className="text-primary/70 text-sm mb-2">
                    Já tem uma conta?
                </p>
                <Link
                    href={route('login')}
                    className="inline-flex items-center text-warning hover:text-primary font-bold transition-colors duration-300"
                >
                    Fazer login ✨
                </Link>
            </div>
        </InfantilLayout>
    );
}
