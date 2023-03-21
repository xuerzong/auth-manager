import path from 'path'
import fs from 'fs'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'
import tsconfigPaths from 'vite-tsconfig-paths'

const rootDir = path.resolve(__dirname)
const outDir = path.resolve(rootDir, 'dist')

const templatesPath = path.resolve(rootDir, 'src/templates')
const popupHtmlPath = path.resolve(templatesPath, 'popup.html')
const optionsHtmlPath = path.resolve(templatesPath, 'options.html')
const welcomeHtmlPath = path.resolve(templatesPath, 'welcome.html')

const templatesUrlPlugin = (): Plugin => {
  return {
    name: 'templatesUrlPlugin',
    apply: 'serve',
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, _, next) => {
          const originalUrl = req.originalUrl
          if (originalUrl === '/') {
            req.url = path.join(
              '/',
              path.relative(rootDir, templatesPath),
              'welcome.html'
            )
          } else if (fs.existsSync(path.join(templatesPath, originalUrl))) {
            req.url = path.join(
              '/',
              path.relative(rootDir, templatesPath),
              originalUrl
            )
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
        index: welcomeHtmlPath,
        popup: popupHtmlPath,
        options: optionsHtmlPath,
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    templatesUrlPlugin(),
    renameTemplatesOutputNamePlugin({
      [path.relative(rootDir, popupHtmlPath)]: path.relative(
        templatesPath,
        popupHtmlPath
      ),
      [path.relative(rootDir, optionsHtmlPath)]: path.relative(
        templatesPath,
        optionsHtmlPath
      ),
      [path.relative(rootDir, welcomeHtmlPath)]: path.relative(
        templatesPath,
        welcomeHtmlPath.replace('welcome.html', 'index.html')
      ),
    }),
    visualizer(),
  ],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
})
