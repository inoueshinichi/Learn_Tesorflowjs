import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // ← 追加

export default defineConfig({
  main: {
    build: {
      rollupOptions: {
        // ここに除外したいモジュールを羅列する
        external: ['multer', 'express', '@prisma/client', 'ws']
      }
    },
    ssr: {
      // 依存関係を外部として扱う設定
      noExternal: [] 
    },
  },
  preload: {
    plugins: [],
    build: {
      
    }
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    plugins: [tailwindcss(), react({ jsxImportSource: '@emotion/react' })]
  }
})
