/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#3361D8',
        secondary: '#3C42CE',
        highlight: '#007aff',
        background: '#ECEFF2',
        textgradient: 'linear-gradient(90deg, #561BB6 0%, #253FC8 100%)',
        resourceSubNode: '#DEE2E7',
        white: '#FFFFFF',
        thirdary: '#1A1B50',
        eugene: '#6B6DB0',
        footer: '#040E16',
        darkBlue: '#1A1B50',
      },
      borderColor: {
        light: 'rgb(0,0,0,0.3)',
        lightBlue: '#3361D8'
      },
      textColor: {
        main: 'rgb(0,0,0)',
        secondary: 'rgb(0,0,0,0.6)',
        placeholder: 'rgb(0,0,0,0.3)',
        darkBlue: '#1A1B50',
        lightBlue: '#3361D8'
      },
      fontFamily: {
        'kanit-text': ['"Kanit"'],
        'roboto-text': ['"Roboto"'],
        'oxygen-text': ['"Oxygen"'],
      },
      boxShadow: {
        standard: '0px 4px 20px rgba(0, 0, 0, 0.15)',
      },
      screens: { // use fucking default breakpoint not this stupid shit
        // "landing-min": "1130px",
        // "mobile-landing": "970px",
        // "bigger-nodes": "400px"
      },
      backgroundImage: {
        buttongradient: 'linear-gradient(90deg, #3361D8 0%, #262EE7 100%)',
      },
      transitionProperty: {
        'border': 'border-color',
        'allNoTransform': 'background-color, border-color, color, fill, stroke, opacity, box-shadow',
      },
    strokeWidth: {
      '3': '3',
    },
    animation: {
      'flowingDash': 'flowingDash 250ms linear infinite',
      'flowingGradient': 'flowingGradient 100ms linear infinite',
    },
    keyframes: {
      flowingDash: {
        '0%': { strokeDashoffset: '16' },
        '100%': { strokeDashoffset: '0' },
      },
      flowingGradient: {
        '0%': { 'background-position': '0 0' },
        '100%': { 'background-position': '100 0' },
      },
    },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    function ({ addUtilities }) {
      addUtilities({
        '.dashed-line': {
          strokeDasharray: '2, 6',
          strokeLinecap : 'round',
          strokeDashoffset: '8',
        },
        '.gradient-line': {
          strokeDasharray: '8, 8',
          strokeDashoffset: '8',
        },
      });
    },
  ],
};
