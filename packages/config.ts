import path from 'path'
import fs from 'fs'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { renameTemplatesOutputNamePlugin } from './plugins'
import pkg from '../package.json'

const rootDir = path.resolve(process.cwd())
const outDir = 'dist'
const templatesPath = path.resolve(rootDir, 'src/templates')

// filename => output filename
const templates = {
  popup: 'popup',
  options: 'options',
  welcome: 'index',
}

const templatesUrlPlugin = (): Plugin => {
  return {
    name: 'templatesUrlPlugin',
    apply: 'serve',
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, _, next) => {
          const originalUrl = req.originalUrl

          if (!originalUrl) return next()

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

export const serverConfig = defineConfig({
  // plugins: [react(), tsconfigPaths(), templatesUrlPlugin()],
})

export const resolveConfig = (
  commond: 'build' | 'dev',
  isProd = false
): Record<string, any> => {
  const rootPath = isProd ? `./node_modules/${pkg.name}` : '.'
  const srcPath = rootPath + '/src'
  const templatePath = srcPath + '/templates'

  const getTemplateFilePath = (filename: string) =>
    path.resolve(rootDir, templatePath, filename)
  const getTemplateFileRelativePath = (filename: string) => {
    return path.relative(rootDir, getTemplateFilePath(filename))
  }

  if (commond === 'build')
    return defineConfig({
      mode: 'production',
      root: rootPath,
      resolve: {
        alias: {
          '~': srcPath,
          '@': path.resolve(rootDir, srcPath),
        },
      },
      build: {
        outDir,
        rollupOptions: {
          input: Object.entries(templates).reduce((pre, [key, value]) => {
            return {
              ...pre,
              [value]: getTemplateFilePath(`${key}.html`),
            }
          }, {}),
        },
      },
      plugins: [
        react(),
        renameTemplatesOutputNamePlugin(
          Object.entries(templates).reduce((pre, [key, value]) => {
            return {
              ...pre,
              [getTemplateFileRelativePath(`${key}.html`)]: `${value}.html`,
            }
          }, {})
        ),
      ],
    })

  return serverConfig
}
