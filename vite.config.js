// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // 使用相对路径，确保在GitHub Pages上正确加载
  plugins: [react()],
  build: {
    // 确保构建后的文件支持直接打开HTML和GitHub Pages部署
    rollupOptions: {
      output: {
        // 确保资源路径使用相对路径
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js'
      }
    }
  }
})
