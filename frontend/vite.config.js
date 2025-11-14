import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react(),],
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, 
      },
    },
    chunkSizeWarningLimit: 2000,  ///AQUI ERA 1000
 

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
     // Reduce el uso de memoria durante la compilación , NO ESTABA
    cssMinify: true,
  },
    
});


//EJECUTAR ESTO AL COMPILAR EN PRODUCTION
//NODE_OPTIONS="--max-old-space-size=2048" npm run build
