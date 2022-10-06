import {defineConfig} from 'vite';
import prismjs from 'vite-plugin-prismjs';
import solidPlugin from 'vite-plugin-solid';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    solidPlugin(),
    tsconfigPaths(),
    prismjs({
      languages: ['bash', 'js', 'tsx', 'html', 'css'],
      plugins: ['copy-to-clipboard', 'line-highlight'],
      css: false,
    }),
  ],
  build: {
    rollupOptions: {
      external: ['solid-js'],
    },
  },
});
