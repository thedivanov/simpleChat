module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minWidth: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#3B82F6',
      'secondary': '#ffed4a',
      'danger': '#e3342f',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

const colors = require('tailwindcss/colors')

// module.exports = {
//   theme: {
//     screens: {
//       sm: '480px',
//       md: '768px',
//       lg: '976px',
//       xl: '1440px',
//     },
//     colors: {
//       gray: colors.coolGray,
//       blue: colors.lightBlue,
//       red: colors.rose,
//       pink: colors.fuchsia,
//     },
//     fontFamily: {
//       sans: ['Graphik', 'sans-serif'],
//       serif: ['Merriweather', 'serif'],
//     },
//     extend: {
//       spacing: {
//         '128': '32rem',
//         '144': '36rem',
//       },
//       borderRadius: {
//         '4xl': '2rem',
//       }
//     }
//   }
// }