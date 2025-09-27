import { Link } from '@inertiajs/react';

export default function InfantilLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-card-bg via-surface to-secondary/10">
            {/* Header com logo da escola */}
            <div className="flex items-center justify-center pt-8 pb-4">
                <Link href="/" className="flex flex-col items-center">
                    <div className="text-6xl mb-2 animate-logoFloat transition-all duration-300 ease-custom">🏫</div>
                    <h1 className="text-3xl font-bold text-text-primary drop-shadow-lg">
                        Escola Criativa
                    </h1>
                    <p className="text-lg text-text-secondary font-medium">
                        Onde a imaginação voa!
                    </p>
                </Link>
            </div>

            {/* Container principal */}
            <div className="flex items-center justify-center px-4 py-8">
                <div className="w-full max-w-md">
                    {/* Card principal com design infantil */}
                    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-primary/30 overflow-hidden">
                        {/* Decoração superior */}
                        <div className="bg-gradient-to-r from-primary to-color-5 h-3 relative">
                            <div className="absolute -top-2 left-4 w-6 h-6 bg-warning rounded-full border-2 border-white"></div>
                            <div className="absolute -top-2 right-4 w-6 h-6 bg-success rounded-full border-2 border-white"></div>
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-info rounded-full border-2 border-white"></div>
                        </div>
                        
                        {/* Conteúdo */}
                        <div className="p-8">
                            {children}
                        </div>
                        
                        {/* Decoração inferior */}
                        <div className="bg-gradient-to-r from-success to-info h-3 relative">
                            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-color-1 rounded-full border-2 border-white"></div>
                            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-color-3 rounded-full border-2 border-white"></div>
                        </div>
                    </div>
                    
                    {/* Elementos decorativos flutuantes */}
                    <div className="absolute top-20 left-10 text-4xl animate-bounce" style={{animationDelay: '0s'}}>🌟</div>
                    <div className="absolute top-32 right-16 text-3xl animate-bounce" style={{animationDelay: '1s'}}>🎨</div>
                    <div className="absolute bottom-20 left-20 text-3xl animate-bounce" style={{animationDelay: '2s'}}>📚</div>
                    <div className="absolute bottom-32 right-10 text-4xl animate-bounce" style={{animationDelay: '0.5s'}}>🎈</div>
                </div>
            </div>
            
            {/* Footer */}
            <div className="text-center pb-6">
                <p className="text-primary/70 text-base font-bold">
                    Feito com 💖 para nossas crianças criativas
                </p>
            </div>
        </div>
    );
}
