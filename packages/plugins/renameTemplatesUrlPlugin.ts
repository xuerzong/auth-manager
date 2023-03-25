import type { Plugin } from 'vite'

export const renameTemplatesUrlPlugin = (
  urls: Record<string, string>
): Plugin => {
  return {
    name: 'renameTemplatesUrlPlugin',
    apply: 'serve',
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, _, next) => {
          const originalUrl = req.originalUrl

          if (!originalUrl) return next()

          req.url = urls[originalUrl]

          next()
        })
      }
    },
  }
}
