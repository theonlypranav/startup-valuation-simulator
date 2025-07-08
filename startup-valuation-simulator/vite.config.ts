import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path'; // ✅ Use `node:` prefix
import { fileURLToPath } from 'node:url'; // ✅ Use `node:` prefix

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // ✅ Works now

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
