/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            // Palette taken from the portrait: studio backdrop, suit, tie, shirt, plus one brass accent
            colors: {
                studio: '#5B5E62',
                suit: '#26292E',
                tie: '#1B2A4A',
                'tie-2': '#24365C',
                shirt: '#F4F4F2',
                porcelain: '#E9EAEC',
                mist: '#D6D9DE',
                slate: '#5A5F68',
                brass: '#B4925F',
            },
            fontFamily: {
                display: ['"Schibsted Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
            },
        },
    },
    plugins: [],
}
