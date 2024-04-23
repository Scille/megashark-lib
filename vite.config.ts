import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    libInjectCss(),
    dts({
      include: ['lib'],
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lib': path.resolve(__dirname, './lib'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  build: {
    manifest: true,
    minify: true,
    reportCompressedSize: true,
    lib: {
      entry: path.resolve(__dirname, 'lib/main.ts'),
      fileName: 'main',
      name: 'megashark-lib',
    },
    rollupOptions: {
      external: ['vue', '@ionic/vue', 'vue-i18n', '@capacitor/core'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue',
          '@ionic/vue': 'IonicVue',
          'vue-i18n': 'VueI18n',
          '@capacitor/core': 'Capacitor',
        },
      },
    },
  },
});
