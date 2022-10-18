import { downloadURI } from '.'

interface DefaultJSONType {
  [key: string]: any
}

export const exportJson = (json: DefaultJSONType, fileName = 'Download') => {
  downloadURI(
    'data:application/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(json)),
    `${fileName}.json`
  )
}

// Nothing to do
// Just to add a type
export const importJson = <T extends DefaultJSONType>(value: unknown) => {
  return value as T
}
