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
      screens: {
        "landing-min": "1130px",
        "mobile-landing": "970px",
        "bigger-nodes": "400px"
      },
      backgroundImage: {
        buttongradient: 'linear-gradient(90deg, #3361D8 0%, #262EE7 100%)',
      },
      transitionProperty: {
        'border': 'border-color',
        'allNoTransform': 'background-color, border-color, color, fill, stroke, opacity, box-shadow',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
