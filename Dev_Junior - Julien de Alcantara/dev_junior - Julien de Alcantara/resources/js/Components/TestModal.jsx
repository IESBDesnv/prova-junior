import { useEffect } from 'react';

const TestModal = ({ isOpen, onClose, title, message }) => {
    useEffect(() => {
        console.log('TestModal useEffect - isOpen:', isOpen);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    console.log('TestModal render - isOpen:', isOpen);
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/50"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6">
                <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
                <p className="text-gray-700 mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full px-4 py-2 bg-primary text-white rounded-lg font-bold"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default TestModal;
