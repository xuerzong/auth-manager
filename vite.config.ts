import path from 'path'
import fs from 'fs'
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

const templatesUrlPlugin = (): Plugin => {
  return {
    name: 'templatesUrlPlugin',
    apply: 'serve',
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (
            fs.existsSync(
              path.join(rootDir, templatesPath, `${req.originalUrl}.html`)
            )
          ) {
            req.url = `/${templatesPath}${req.originalUrl}.html`
          }
          next()
        })
      }
    },
  }
}

const renameTemplatesOutputNamePlugin = (
  filenames: Record<string, string>
): Plugin => {
  return {
    name: 'renameTemplatesOutputNamePlugin',
    enforce: 'post',
    generateBundle(_, bundle) {
      Object.keys(filenames).forEach((key) => {
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
        options: path.resolve(rootDir, optionsHtmlPath),
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    templatesUrlPlugin(),
    splitVendorChunkPlugin(),
    renameTemplatesOutputNamePlugin({
      [popupHtmlPath]: popupHtmlPath.replace(`${templatesPath}/`, ''),
      [optionsHtmlPath]: optionsHtmlPath.replace(`${templatesPath}/`, ''),
    }),
    visualizer(),
  ],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
})
