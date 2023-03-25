import { bgRed, bgGreen, bgBlue, bgYellow } from 'picocolors'

const info = (msg: string) => {
  console.log(`${bgBlue('[Info]')}: ${msg}`)
}

const success = (msg: string) => {
  console.log(`${bgGreen('[Success]')}: ${msg}`)
}

const warn = (msg: string) => {
  console.log(`${bgYellow('[Warn]')}: ${msg}`)
}

const error = (msg: string) => {
  console.log(`${bgRed('[Error]')}: ${msg}`)
}

export { info, success, warn, error }
