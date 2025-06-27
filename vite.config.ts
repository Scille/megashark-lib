// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS
// eslint-disable-next-line spaced-comment
/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue';
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import path from 'path';
import { UserConfig, defineConfig } from 'vite';
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
    {
      name: 'copy-theme-files',
      closeBundle(): void {
        console.log('[theme] Copying files...');
        copyFiles('lib/theme', 'dist/theme');
        console.log('[theme] Files copied!');
      },
    },
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
    include: ['tests/components/specs/*.spec.ts', 'tests/unit/specs/*.spec.ts'],
    globals: true,
    alias: {
      '@lib': path.resolve(__dirname, './lib'),
      '@tests': path.resolve(__dirname, './tests'),
    },
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
      cssFileName: 'style',
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

function isFile(target: string): boolean {
  return statSync(target).isFile();
}

function copyFiles(source: string, target: string): void {
  const entries = readdirSync(source);

  // Ensure the target directory exists
  mkdirSync(target, { recursive: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry);
    const targetPath = path.join(target, entry);
    if (isFile(sourcePath)) {
      copyFileSync(sourcePath, targetPath);
    } else {
      copyFiles(sourcePath, targetPath);
    }
  }
}

export default defineConfig(config);
