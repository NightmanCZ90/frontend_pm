import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import suidPlugin from '@suid/vite-plugin';
import checker from 'vite-plugin-checker'

export default defineConfig({
  plugins: [
    solidPlugin(),
    suidPlugin(),
    checker({
      typescript: {
        root: '.'
      },
    })
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
