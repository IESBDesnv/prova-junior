// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
                colors: {
                    // Paleta "Criativa e Confiável" - Profissional e Organizada
                    'primary': '#FF6B6B', // Rosa-choque vibrante para botões e destaques
                    'primary-hover': '#FF5252', // Rosa-choque mais escuro
                    'secondary': '#4ECDC4', // Verde-menta suave para cartões
                    'secondary-hover': '#26A69A', // Verde-menta mais escuro
                    'accent': '#45B7D1', // Azul-claro para cartões secundários
                    'accent-hover': '#2196F3', // Azul-claro mais escuro
                    'success': '#66BB6A', // Verde suave
                    'warning': '#FFB74D', // Laranja-coral suave
                    'danger': '#EF5350', // Vermelho suave
                    'info': '#42A5F5', // Azul informativo
                    
                    // Cores de fundo e cartões
                    'card-bg': '#F8F9FA', // Cinza muito claro para fundo
                    'card-border': '#E3F2FD', // Azul muito claro para bordas
                    'surface': '#FFFFFF', // Branco para superfícies
                    
                    // Cores de texto
                    'text-primary': '#2C3E50', // Azul escuro para texto principal
                    'text-secondary': '#7F8C8D', // Cinza para texto secundário
                    'text-muted': '#BDC3C7', // Cinza claro para texto desabilitado
                
                // Tons de cinza personalizados
                'gray-50': '#f9fafb',
                'gray-100': '#f3f4f6',
                'gray-200': '#e5e7eb',
                'gray-300': '#d1d5db',
                'gray-400': '#9ca3af',
                'gray-600': '#4b5563',
                'gray-700': '#374151',
                'gray-800': '#1f2937',
                'gray-900': '#111827',
                
                // Cores antigas mantidas para compatibilidade
                'soft-blue': '#B2D2E4',
                'mint-green': '#A2E4B2',
                'peach-pink': '#E4B2B2',
                'butter-yellow': '#E4E4B2',
                'lavender': '#E6E6FA',
                'coral': '#FFB6C1',
                'seafoam': '#9FE2BF',
                'cream': '#FFF8DC',
                'powder-blue': '#B0E0E6',
                'rose-quartz': '#F7CAC9',
                'lemon-chiffon': '#FFFACD',
                'mint-cream': '#F0FFF0',
            },
            boxShadow: {
                'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
            },
            borderRadius: {
                'custom': '0.5rem',
            },
            transitionTimingFunction: {
                'custom': 'cubic-bezier(0.4, 0, 0.2, 1)',
            },
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                'fadeIn': 'fadeIn 0.3s ease-in-out',
                'scaleIn': 'scaleIn 0.3s ease-out',
                'bounce': 'bounce 1s infinite',
                'pulse': 'pulse 2s infinite',
                'logoFloat': 'logoFloat 3s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                logoFloat: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
            },
        },
    },

    plugins: [forms],
};