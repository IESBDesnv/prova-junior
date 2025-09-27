import { useEffect } from 'react';

const InfantilConfirmationModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    title, 
    message, 
    confirmText = 'Sim, excluir',
    cancelText = 'Cancelar',
    type = 'danger' 
}) => {
    console.log('InfantilConfirmationModal render - isOpen:', isOpen, 'title:', title, 'message:', message);
    useEffect(() => {
        console.log('InfantilConfirmationModal useEffect - isOpen:', isOpen);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    console.log('InfantilConfirmationModal - isOpen:', isOpen, 'returning null?', !isOpen);
    if (!isOpen) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    icon: '⚠️',
                    bgColor: 'bg-danger/10',
                    borderColor: 'border-danger/30',
                    textColor: 'text-danger',
                    confirmButtonColor: 'bg-danger hover:bg-danger/90',
                    cancelButtonColor: 'bg-gray-500 hover:bg-gray-600'
                };
            case 'warning':
                return {
                    icon: '⚠️',
                    bgColor: 'bg-warning/10',
                    borderColor: 'border-warning/30',
                    textColor: 'text-warning',
                    confirmButtonColor: 'bg-warning hover:bg-warning/90',
                    cancelButtonColor: 'bg-gray-500 hover:bg-gray-600'
                };
            default:
                return {
                    icon: '❓',
                    bgColor: 'bg-info/10',
                    borderColor: 'border-info/30',
                    textColor: 'text-info',
                    confirmButtonColor: 'bg-info hover:bg-info/90',
                    cancelButtonColor: 'bg-gray-500 hover:bg-gray-600'
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}
        >
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div 
                className="relative bg-white rounded-3xl shadow-2xl border-4 border-primary/30 max-w-md w-full mx-4 transform transition-all duration-300"
                style={{ position: 'relative', zIndex: 10000 }}
            >
                {/* Decoração superior */}
                <div className="bg-gradient-to-r from-primary to-color-5 h-3 relative rounded-t-3xl">
                    <div className="absolute -top-2 left-4 w-6 h-6 bg-warning rounded-full border-2 border-white animate-bounce"></div>
                    <div className="absolute -top-2 right-4 w-6 h-6 bg-success rounded-full border-2 border-white animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-info rounded-full border-2 border-white animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>

                {/* Conteúdo */}
                <div className="p-8">
                    {console.log('Modal content renderizando - title:', title, 'message:', message)}
                    {/* Ícone e título */}
                    <div className="text-center mb-6">
                        <div className="text-6xl mb-4 animate-pulse">{styles.icon}</div>
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

                    {/* Botões */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                console.log('Botão cancelar clicado');
                                onClose();
                            }}
                            className={`flex-1 px-6 py-3 rounded-2xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${styles.cancelButtonColor}`}
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={() => {
                                console.log('Botão confirmar clicado');
                                onConfirm();
                            }}
                            className={`flex-1 px-6 py-3 rounded-2xl text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl ${styles.confirmButtonColor}`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfantilConfirmationModal;
