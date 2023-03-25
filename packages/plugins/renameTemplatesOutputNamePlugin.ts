import type { Plugin } from 'vite'

export const renameTemplatesOutputNamePlugin = (
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
