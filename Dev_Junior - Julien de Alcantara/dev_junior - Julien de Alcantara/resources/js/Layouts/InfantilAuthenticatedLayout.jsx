import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import InfantilButton from '@/Components/InfantilButton';

export default function InfantilAuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-card-bg via-surface to-accent/10">
            {/* Skip links para acessibilidade */}
            <div className="sr-only">
                <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-50">
                    Pular para o conteúdo principal
                </a>
                <a href="#main-navigation" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-48 bg-primary text-white px-4 py-2 rounded-lg z-50">
                    Pular para a navegação
                </a>
            </div>
            
            {/* Header com navegação */}
            <nav id="main-navigation" className="bg-white/90 backdrop-blur-sm shadow-lg border-b-2 border-primary/20 relative z-50" role="navigation" aria-label="Navegação principal">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">
                        {/* Logo e título */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <div className="text-3xl mr-3 animate-logoFloat transition-all duration-300 ease-custom">🏫</div>
                                <div>
                                    <h1 className="text-xl font-bold text-text-primary">
                                        Escola Criativa
                                    </h1>
                                    <p className="text-xs text-text-secondary">
                                        Onde a imaginação voa!
                                    </p>
                                </div>
                            </Link>
                        </div>

                        {/* Navegação desktop - oculta em tablets */}
                        <div className="hidden lg:flex lg:items-center lg:space-x-4 relative z-50">
                            <Link
                                href={route('dashboard')}
                                className="px-4 py-2 rounded-2xl text-sm font-medium text-primary hover:bg-primary/10 transition-all duration-300"
                                aria-current={window.location.pathname === '/dashboard' ? 'page' : undefined}
                            >
                                📊 Dashboard
                            </Link>
                            
                            <Link
                                href={route('disciplinas.index')}
                                className="px-4 py-2 rounded-2xl text-sm font-medium text-primary hover:bg-primary/10 transition-all duration-300"
                                aria-current={window.location.pathname === '/disciplinas' ? 'page' : undefined}
                            >
                                📚 Disciplinas
                            </Link>

                            {/* Informações do usuário */}
                            <div className="flex items-center space-x-3">
                                {/* Link para perfil */}
                                <Link
                                    href={route('profile.edit')}
                                    className="px-3 py-2 rounded-2xl text-sm font-medium text-primary hover:bg-primary/10 transition-all duration-300"
                                >
                                    👤 Perfil
                                </Link>
                                
                                {/* Link Sair - após perfil */}
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="px-3 py-2 rounded-2xl text-sm font-medium text-warning hover:bg-warning/10 transition-all duration-300"
                                >
                                    🚪 Sair
                                </Link>
                            </div>
                        </div>

                        {/* Botão toggle para mobile e tablet */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                className="flex items-center space-x-2 px-4 py-2 rounded-2xl text-primary hover:bg-primary/10 transition-all duration-300"
                                aria-label="Abrir menu de navegação"
                                aria-expanded={showingNavigationDropdown}
                                aria-controls="mobile-menu"
                            >
                                <span className="text-sm font-medium hidden sm:block">
                                    Menu
                                </span>
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d={showingNavigationDropdown ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

            </nav>

            {/* Header customizado se fornecido */}
            {header && (
                <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b-2 border-primary/20">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Conteúdo principal */}
            <main id="main-content" className="min-h-screen" role="main">
                {children}
            </main>

                {/* Menu lateral direito para mobile e tablet - FORA DO NAV */}
                {showingNavigationDropdown && (
                    <div className="lg:hidden fixed inset-0" style={{zIndex: 999999}} role="dialog" aria-modal="true" aria-labelledby="mobile-menu-title">
                        {/* Overlay escuro */}
                        <div 
                            className="absolute inset-0 bg-black/50"
                            onClick={() => setShowingNavigationDropdown(false)}
                            aria-label="Fechar menu"
                        ></div>
                        
                        {/* Menu lateral */}
                        <div 
                            id="mobile-menu"
                            className="absolute right-0 top-0 h-full w-80 max-w-sm bg-white border-l-2 border-primary/20 shadow-2xl" 
                            style={{zIndex: 1000000}}
                            role="navigation"
                            aria-labelledby="mobile-menu-title"
                        >
                        <div className="p-6 h-full flex flex-col">
                            {/* Header do menu */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 id="mobile-menu-title" className="text-xl font-bold text-primary">Menu</h2>
                                <button
                                    onClick={() => setShowingNavigationDropdown(false)}
                                    className="p-2 rounded-2xl text-primary hover:bg-primary/10 transition-all duration-300"
                                    aria-label="Fechar menu de navegação"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                                {/* Navegação principal */}
                                <nav className="space-y-3 mb-6" role="navigation" aria-label="Menu principal">
                                    <Link
                                        href={route('dashboard')}
                                        className="flex items-center px-4 py-3 rounded-2xl text-primary hover:bg-primary/10 transition-all duration-300"
                                        onClick={() => setShowingNavigationDropdown(false)}
                                        aria-current={window.location.pathname === '/dashboard' ? 'page' : undefined}
                                    >
                                        <span className="text-2xl mr-3">📊</span>
                                        <span className="font-medium">Dashboard</span>
                                    </Link>
                                    
                                    <Link
                                        href={route('disciplinas.index')}
                                        className="flex items-center px-4 py-3 rounded-2xl text-primary hover:bg-primary/10 transition-all duration-300"
                                        onClick={() => setShowingNavigationDropdown(false)}
                                        aria-current={window.location.pathname === '/disciplinas' ? 'page' : undefined}
                                    >
                                        <span className="text-2xl mr-3">📚</span>
                                        <span className="font-medium">Disciplinas</span>
                                    </Link>
                                    
                                
                                </nav>

                            {/* Seção do usuário */}
                            <div className="border-t border-primary/20 pt-6 mt-auto">
                                {/* Botões do usuário */}
                                <div className="space-y-2">
                                    <Link
                                        href={route('profile.edit')}
                                        className="flex items-center px-4 py-3 rounded-2xl text-primary hover:bg-primary/10 transition-all duration-300"
                                        onClick={() => setShowingNavigationDropdown(false)}
                                    >
                                        <span className="text-xl mr-3">👤</span>
                                        <span className="font-medium">Meu Perfil</span>
                                    </Link>
                                    
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="flex items-center w-full px-4 py-3 rounded-2xl text-warning hover:bg-warning/10 transition-all duration-300"
                                        onClick={() => setShowingNavigationDropdown(false)}
                                    >
                                        <span className="text-xl mr-3">🚪</span>
                                        <span className="font-medium">Sair</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
