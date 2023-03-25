import { build } from 'vite'
import { resolveConfig } from './config'

export const bundle = () => {
  return build(resolveConfig('build', true))
}
