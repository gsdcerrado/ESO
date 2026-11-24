if (typeof tailwind !== 'undefined') {
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          },
          colors: {
            olive: {
              50: '#f5f7f3',
              100: '#e7ece2',
              200: '#cfd9c6',
              300: '#adbe9e',
              400: '#889f74',
              500: '#6a8256',
              600: '#536742',
              700: '#425236',
              800: '#36432d',
              900: '#2d3826',
              950: '#181f14',
            },
            ochre: {
              50: '#fbf8f1',
              100: '#f5eedc',
              200: '#eadab7',
              300: '#ddc089',
              400: '#cfa25b',
              500: '#c28a3c',
              600: '#a97030',
              700: '#8b5729',
              800: '#724727',
              900: '#5e3b23',
            },
            paper: '#f8f8f5',
          }
        }
      }
    }
}
