/** @type {import('tailwindcss').Config} */

const { nextui } = require('@nextui-org/react');

module.exports = {
    important: true,
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
        './node_modules/@nextui-org/theme/dist/components/skeleton.js',
    ],
    theme: {
        fontSize: {
            'xs': '10px',
            's': '12px',
            'm': '16px',
            'l': '20px',
            'xl': '24px',
            '2xl': '36px',
            '3xl': '48px',
            '10xl': '86px',
        },
        extend: {
            colors: {
                'main': '#f0f0f0',
                'main-bg': '#303030',
                'card-bg': '#444',
                'accent': '#ff9900',
                'input-bg': '#27272a',
                'input-hover-bg': '#3f3f46',
                'input-outline': '#006fee',
            },
        },
    },
    darkMode: 'class',
    plugins: [
        nextui({
            themes: {
                dark: {
                    colors: {
                        danger: {
                            DEFAULT: 'rgb(239 68 68)',
                        },
                    },
                },
            },
        }),
    ],
};
