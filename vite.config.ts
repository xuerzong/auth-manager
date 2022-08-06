import path from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import tsconfigPaths from 'vite-tsconfig-paths'

const rootDir = path.resolve(__dirname)
const outDir = path.resolve(__dirname, 'dist')

const templatesPath = 'src/templates'
const popupHtmlPath = `${templatesPath}/popup.html`
const optionsHtmlPath = `${templatesPath}/options.html`

const renameTemplatesOutputNamePlugin = (filenames: Record<string, string>): Plugin => {
  return {
    name: 'renameIndex',
    enforce: 'post',
    generateBundle(_, bundle) {
      Object.keys(filenames).forEach(key => {
        const tmp = bundle[key]
        tmp.fileName = filenames[key]
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir,
    rollupOptions: {
      input: {
        popup: path.resolve(rootDir, popupHtmlPath),
        options: path.resolve(rootDir, optionsHtmlPath)
      },
    }
  },
  plugins: [
    react(),
    tsconfigPaths(),
    splitVendorChunkPlugin(),
    renameTemplatesOutputNamePlugin({
      [popupHtmlPath]: popupHtmlPath.replace(`${templatesPath}/`, ''),
      [optionsHtmlPath]: optionsHtmlPath.replace(`${templatesPath}/`, '')
    }),
    visualizer()
  ]
})
