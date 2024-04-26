// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS
/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
const config: UserConfig = {
  plugins: [
    vue(),
    libInjectCss(),
    dts({
      include: ['lib'],
      rollupTypes: true,
      copyDtsFiles: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lib': path.resolve(__dirname, './lib'),
      '@megashark': path.resolve(__dirname, './lib'),
    },
  },
  test: {
    setupFiles: [path.resolve(__dirname, './tests/support/setup.ts')],
    globals: true,
    alias: {
      '@lib': path.resolve(__dirname, './lib'),
      '@tests': path.resolve(__dirname, './tests'),
    },
    environment: 'happy-dom',
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
};

export default defineConfig(config);
