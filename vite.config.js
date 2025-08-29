import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// 你的仓库名称
const REPO_NAME = "Bartender";

// https://vite.dev/config/
export default defineConfig({
  // 👇 新增这个 base 配置
  base: `/${REPO_NAME}/`, 
  plugins: [react(), tailwindcss()],
});
// export default defineConfig(({ mode }) => {
//   // 加载环境变量
//   const env = loadEnv(mode, process.cwd(), '')
  
//   // 根据环境设置不同的base路径
//   // 默认使用相对路径（用于本地直接打开HTML）
//   // 当设置了VITE_BASE_PATH环境变量时，使用指定的路径（用于GitHub Pages）
//   const basePath = env.VITE_BASE_PATH || './'
  
//   return {
//     plugins: [react()],
//     base: basePath,
//     build: {
//       // 确保构建后的文件支持直接打开HTML
//       rollupOptions: {
//         output: {
//           // 避免使用动态导入，确保所有代码都打包到一个文件中
//           manualChunks: undefined,
//           // 确保资源路径使用相对路径
//           assetFileNames: 'assets/[name].[hash].[ext]',
//           chunkFileNames: 'assets/[name].[hash].js',
//           entryFileNames: 'assets/[name].[hash].js'
//         }
//       }
//     }
//   }
// })
