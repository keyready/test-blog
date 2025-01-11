import * as path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // https://vitejs.dev/config/

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, './src/') }],
    },
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
    define: {
        IS_DEV: JSON.stringify(true),
    },
    optimizeDeps: {
        include: ['@tiptap/core', '@tiptap/react', '@tiptap/starter-kit'],
    },
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:5000/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api\//, ''),
            },
        },
    },
});
