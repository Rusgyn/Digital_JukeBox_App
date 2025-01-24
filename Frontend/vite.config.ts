import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This allow external access, This is useful for testing on different devices within the same network or for allowing others on the same network to access your development server.
    // - `http://localhost:5173`
    // - `http://127.0.0.1:5173`
    // - `http://192.168.1.100:5173`
    port: 5173, // Frontend PORT
    proxy: {
      '/jukeBox': { // /jukeBox: All requests starting with /jukeBox in Frontend will be proxied to the Backend server (http://localhost:3001). Ex: /jukeBox/songs, the Vite proxy will forward the request to http://localhost:3001/jukeBox/songs 
        target: 'http://localhost:3001', // Backend URL. PORT: 3001
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/jukeBox/, '') // Optionally remove /jukeBox prefix. This is useful when the backend server does not expect the /jukeBox prefix in the URL. '/jukeBox/songs' will be rewritten as /songs before being forwarded to the backend server. Works in Backend only.
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