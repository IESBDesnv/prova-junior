import InfantilAuthenticatedLayout from '@/Layouts/InfantilAuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <InfantilAuthenticatedLayout
            header={
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-primary mb-2">
                        Meu Perfil 👤
                    </h2>
                    <p className="text-gray-600">
                        Gerencie suas informações pessoais
                    </p>
                </div>
            }
        >
            <Head title="Meu Perfil" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-8">
                    {/* Informações do Perfil */}
                    <div className="bg-surface rounded-3xl p-8 shadow-lg border-2 border-card-border">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-2xl"
                        />
                    </div>

                    {/* Alterar Senha */}
                    <div className="bg-surface rounded-3xl p-8 shadow-lg border-2 border-card-border">
                        <UpdatePasswordForm className="max-w-2xl" />
                    </div>

                    {/* Excluir Conta */}
                    <div className="bg-surface rounded-3xl p-8 shadow-lg border-2 border-danger/20">
                        <DeleteUserForm className="max-w-2xl" />
                    </div>
                </div>
            </div>
        </InfantilAuthenticatedLayout>
    );
}
