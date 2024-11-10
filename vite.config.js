export default {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Separe as bibliotecas de terceiros, como React, em chunks diferentes
            reactVendor: ['react', 'react-dom'],
            // Aqui você pode adicionar outros módulos que queira dividir
          }
        }
      }
    }
  }
  