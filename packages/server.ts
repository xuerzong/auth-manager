import { createServer } from 'vite'

const PORT = 4090

export const server = async () => {
  await createServer({
    configFile: false,
    server: {
      port: PORT,
    },
  })
}
