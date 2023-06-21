import { defineConfig } from 'vite'
import tsConfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
})
