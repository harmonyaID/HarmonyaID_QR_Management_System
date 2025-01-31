import laravel from "laravel-vite-plugin";
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from "vite";
import path from 'path'

export default defineConfig({
    plugins: [
        laravel({
            input: [
                // Scss
                'resources/scss/main.scss',

                // JS
                'resources/js/app.jsx',

                // Pages
            ],
            refresh: true,
        }),
        viteReact(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './resources/js/'),
        }
    }
})