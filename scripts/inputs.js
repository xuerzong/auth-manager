const path = require('path')
const glob = require('fast-glob')

const allPkgFiles = glob.sync(path.resolve(process.cwd(), 'packages/**/*.ts'))

console.log(allPkgFiles.join(' '))
