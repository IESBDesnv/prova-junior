import { useEffect } from 'react';

const InfantilSuccessModal = ({ 
    isOpen, 
    onClose, 
    title, 
    message, 
    type = 'success' 
}) => {
    console.log('InfantilSuccessModal render - isOpen:', isOpen, 'title:', title);
    
    useEffect(() => {
        console.log('InfantilSuccessModal useEffect - isOpen:', isOpen);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Auto-close após 3 segundos
            const timer = setTimeout(() => {
                console.log('Auto-close do modal após 3 segundos');
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    console.log('InfantilSuccessModal - isOpen:', isOpen, 'returning null?', !isOpen);
    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return {
                    icon: '✅',
                    bgColor: 'bg-success/10',
                    borderColor: 'border-success/30',
                    textColor: 'text-success',
                    buttonColor: 'bg-success hover:bg-success/90'
                };
            case 'info':
                return {
                    icon: 'ℹ️',
                    bgColor: 'bg-info/10',
                    borderColor: 'border-info/30',
                    textColor: 'text-info',
                    buttonColor: 'bg-info hover:bg-info/90'
                };
            case 'warning':
                return {
                    icon: '⚠️',
                    bgColor: 'bg-warning/10',
                    borderColor: 'border-warning/30',
                    textColor: 'text-warning',
                    buttonColor: 'bg-warning hover:bg-warning/90'
                };
            default:
                return {
                    icon: '🎉',
                    bgColor: 'bg-primary/10',
                    borderColor: 'border-primary/30',
                    textColor: 'text-primary',
                    buttonColor: 'bg-primary hover:bg-primary/90'
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="relative bg-white rounded-3xl shadow-2xl border-4 border-primary/30 max-w-md w-full mx-4 transform transition-all duration-300">
                {/* Decoração superior */}
                <div className="bg-gradient-to-r from-primary to-color-5 h-3 relative rounded-t-3xl">
                    <div className="absolute -top-2 left-4 w-6 h-6 bg-warning rounded-full border-2 border-white animate-bounce"></div>
                    <div className="absolute -top-2 right-4 w-6 h-6 bg-success rounded-full border-2 border-white animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-info rounded-full border-2 border-white animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>

                {/* Conteúdo */}
                <div className="p-8">
                    {/* Ícone e título */}
                    <div className="text-center mb-6">
                        <div className="text-6xl mb-4 animate-bounce">{styles.icon}</div>
                        <h2 className="text-2xl font-bold text-primary mb-2">
                            {title}
                        </h2>
                    </div>

                    {/* Mensagem */}
                    <div className={`p-4 rounded-2xl border-2 ${styles.bgColor} ${styles.borderColor} mb-6`}>
                        <p className={`text-center font-bold ${styles.textColor}`}>
                            {message}
                        </p>
                    </div>

                    {/* Botão de fechar */}
                    <div className="text-center">
                        <button
                            onClick={onClose}
                            className={`px-8 py-3 rounded-2xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${styles.buttonColor}`}
                        >
                            Perfeito! 👍
                        </button>
                    </div>

                    {/* Auto-close indicator */}
                    <div className="mt-4 text-center">
                        <div className="text-xs text-gray-500">
                            Esta mensagem desaparecerá automaticamente em 3 segundos
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfantilSuccessModal;
