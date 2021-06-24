import path from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh(), eslintPlugin({ exclude: ['node_modules', '**.scss'] })],
    resolve: {
        alias: [
            {
                find: '@oriavner',
                replacement: path.resolve(__dirname, './src')
            },
            {
                find: '@styles',
                replacement: path.resolve(__dirname, './src/styles')
            },
            {
                find: '@fonts',
                replacement: path.resolve(__dirname, './src/public/fonts')
            }
        ]
    }
})
