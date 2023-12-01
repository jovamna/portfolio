import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


export default defineConfig({
  plugins: [react(), ],
  //base: import.meta.env.PUBLIC_URL,
  base: process.env.NODE_ENV === 'production' ? '/frontend/dist/' : '/',
  build: {

    minify: 'terser',
    terserOptions: {
     
      compress: {
        drop_console: true, 
      },
    },
    chunkSizeWarningLimit: 1000, // Ajusta el límite según tus necesidades
   
    //minify: false,
    //sourcemap: false,
    //outDir: 'dist', // Asegúrate de que esta ruta esté configurada correctamente
    //outDir: path.resolve(__dirname, '../backend/staticfiles'), 


    rollupOptions: {
      output: {
        // Configuración de manualChunks actualizada
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Agrupa los módulos de node_modules en un archivo separado
            return 'vendor';
          }
        },
      },
    },
  },
    
});
