import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@core': resolve(__dirname, './src/core'),
      '@shared': resolve(__dirname, './src/shared'),
      '@config': resolve(__dirname, './src/config'),
    },
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'nest',
      appPath: './src/main.ts',
      tsCompiler: 'swc',
    }),
  ],
  optimizeDeps: {
    exclude: [
      '@nestjs/microservices',
      '@nestjs/websockets',
      '@nestjs/platform-express',
    ],
  },
});
