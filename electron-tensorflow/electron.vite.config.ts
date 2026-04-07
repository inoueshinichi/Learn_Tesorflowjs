import { resolve } from 'path'
import { defineConfig } from 'electron-vite'
import react from '@vitejs/plugin-react'

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
    plugins: [react({ jsxImportSource: '@emotion/react' })]
  }
})
