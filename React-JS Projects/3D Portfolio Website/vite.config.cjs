import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // Specify the output directory for the build
    minify: true, // Enable minification (enabled by default)
    // You can add more build options here if needed
  },
});
