import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import windicss from 'vite-plugin-windicss';

export default defineConfig({
  resolve: {
    alias: [{ find: '~', replacement: path.resolve(__dirname, 'src/') }],
  },
  plugins: [vue(), windicss()],
});
