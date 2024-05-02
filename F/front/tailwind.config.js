/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      // caretColor 유틸리티 추가
      caretColor: {
        blue: 'blue',   // .caret-blue 클래스로 사용 가능
        red: 'red',     // .caret-red 클래스로 사용 가능
        green: 'green', // .caret-green 클래스로 사용 가능
        transparent: 'transparent' // .caret-transparent 클래스로 사용 가능
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities, theme }) {
      const newUtilities = {};
      Object.entries(theme('caretColor')).forEach(([key, value]) => {
        newUtilities[`.caret-${key}`] = { caretColor: value };
      });
      addUtilities(newUtilities, ['responsive', 'hover']);
    }    
  ],
}