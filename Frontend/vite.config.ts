import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { // /api: All requests starting with /api in Frontend will be proxied to the Backend server (http://localhost:3001). Ex: /api/songs, the Vite proxy will forward the request to http://localhost:3001/api/songs 
        target: 'http://localhost:3001', // Backend URL. PORT: 3001
        changeOrigin: true,
        secure: false,
      },
    },
  },
});


/**
 * Note for multiple proxy configurations:
 * import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy for the /api path (for general API calls)
      '/api': {
        target: 'http://localhost:3001', // Same backend URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optionally remove /api prefix
      },
      // Proxy for the /auth path (for authentication-related API calls)
      '/auth': {
        target: 'http://localhost:3001', // Same backend URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, ''), // Optionally remove /auth prefix
      },
    },
  },
});


or 

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy for the /api path (for general API calls)
      '/api': {
        target: 'http://localhost:3001', // Backend URL
        changeOrigin: true,
        secure: false,
      },
      // Proxy for the /auth path (for authentication-related API calls)
      '/auth': {
        target: 'http://localhost:4000', // Another service URL (e.g., authentication service)
        changeOrigin: true,
        secure: false,
      },
      // Proxy for the /files path (for static file handling or other services)
      '/files': {
        target: 'http://localhost:5000', // Another service URL (e.g., file server)
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

 */