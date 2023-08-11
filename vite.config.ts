import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    electron([
      {
        entry: 'electron/main.ts'
      },
      {
        entry: 'electron/preload.ts',
        onstart(options) {
          options.reload();
        }
      }
    ]),
    renderer()
  ]
});
