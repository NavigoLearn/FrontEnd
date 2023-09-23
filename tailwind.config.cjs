/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#3361D8',
        primaryHover: 'rgb(16,75,241)',
        secondary: '#3C42CE',
        highlight: '#007aff',
        backgroundRoadmap: '#ECEFF2',
        background: '#ffffff',
        textgradient: 'linear-gradient(90deg, #561BB6 0%, #253FC8 100%)',
        coverColor: 'rgba(26,27,80,0.4)',
        resourceSubNode: '#DEE2E7',
        white: '#FFFFFF',
        thirdary: '#1A1B50',
        eugene: '#6B6DB0',
        footer: '#040E16',
        darkBlue: '#1A1B50',
        secondaryBlack: 'rgb(0,0,0,0.6)',
        placeholderBlack: 'rgb(0,0,0,0.3)',
        navbarBlue: '#182852'
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
        secondaryDarkBlue: 'rgba(26,27,80,0.7)',
        lightBlue: '#3361D8',
      },
      fontFamily: {
        'kanit-text': ['"Kanit"'],
        'roboto-text': ['"Roboto"'],
      },
      boxShadow: {
        standard: '0px 4px 4px rgba(0, 0, 0, 0.10)',
        darkBlueCustom:'0px 6px 6px 0px rgba(60, 66, 206, 0.10)'
      },
      screens: { // fk u eugene
        // for each new stupid screen size, one part of the integration bed will be shattered stupid
        "landing-min": "1260px",
        "monitor": "2000px",
      },
      backgroundImage: {
        buttongradient: 'linear-gradient(90deg, #3361D8 0%, #262EE7 100%)',
      },
      transitionProperty: {
        'border': 'border-color',
        'allNoTransform': 'background-color, border-color, color, fill, stroke, opacity, box-shadow',
      },
     cursor: {
      'custom-link': "url('/linkmouse.svg'), auto",
    },
    strokeWidth: {
      '3': '3',
      '4': '4',
    },
    animation: {
      'flowingDash': 'flowingDash 250ms linear infinite',
      'flowingDashFaster': 'flowingDash 175ms linear infinite',
      'flowingDashSlower': 'flowingDash 400ms linear infinite',
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
