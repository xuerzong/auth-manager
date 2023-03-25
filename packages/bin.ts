import path from 'path'
import minimist from 'minimist'
import { bundle } from './build'
import { server } from './server'

const argv = minimist(process.argv.slice(2))
const command = argv._[0] // 'build' | 'dev'

const isBuild = command === 'build'
const isDev = !command || command === 'dev'

const ROOT_DIR = process.cwd()
const WORKFLOW_FILE_PATH = path.resolve(ROOT_DIR, 'workflow.js')

if (isBuild) {
  bundle()
}

if (isDev) {
  server()
}
