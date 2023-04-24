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
        eugene: '#6B6DB0'
      },
      borderColor: {
        light: 'rgb(0,0,0,0.3)',
      },
      textColor: {
        main: 'rgb(0,0,0)',
        secondary: 'rgb(0,0,0,0.6)',
        placeholder: 'rgb(0,0,0,0.3)',
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
        "landing-min": "1130px"
      },
      backgroundImage: {
        buttongradient: 'linear-gradient(90deg, #3361D8 0%, #262EE7 100%)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
