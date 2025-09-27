import { useEffect } from 'react';

const InfantilModal = ({ isOpen, onClose, title, message, type = 'error' }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'error':
                return {
                    icon: '❌',
                    bgColor: 'bg-danger/10',
                    borderColor: 'border-danger/30',
                    textColor: 'text-danger',
                    buttonColor: 'bg-danger hover:bg-danger/90'
                };
            case 'success':
                return {
                    icon: '✅',
                    bgColor: 'bg-success/10',
                    borderColor: 'border-success/30',
                    textColor: 'text-success',
                    buttonColor: 'bg-success hover:bg-success/90'
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
                    icon: 'ℹ️',
                    bgColor: 'bg-info/10',
                    borderColor: 'border-info/30',
                    textColor: 'text-info',
                    buttonColor: 'bg-info hover:bg-info/90'
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
            <div className="relative bg-white rounded-3xl shadow-2xl border-4 border-primary/30 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
                {/* Decoração superior */}
                <div className="bg-gradient-to-r from-primary to-color-5 h-3 relative rounded-t-3xl">
                    <div className="absolute -top-2 left-4 w-6 h-6 bg-warning rounded-full border-2 border-white"></div>
                    <div className="absolute -top-2 right-4 w-6 h-6 bg-success rounded-full border-2 border-white"></div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-info rounded-full border-2 border-white"></div>
                </div>

                {/* Conteúdo */}
                <div className="p-8">
                    {/* Ícone e título */}
                    <div className="text-center mb-6">
                        <div className="text-6xl mb-4">{styles.icon}</div>
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
                            Entendi! 👍
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfantilModal;
