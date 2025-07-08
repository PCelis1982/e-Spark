import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: 'local.e-spark.dev',
    port: 3000,
    https: {
      key: './certs/local.e-spark.dev-key.pem',
      cert: './certs/local.e-spark.dev.pem'
    }
  }
});