type Params = Record<string, any>
type Headers = Record<string, any>
type Data = Record<string, any>

export function getQueryString(params: Params): string {
  return Object.keys(params)
    .reduce((arr: string[], key: string) => {
      if (params[key] !== undefined) {
        return [...arr, `${key}=${encodeURIComponent(params[key])}`]
      }
      return arr
    }, [])
    .join('&')
}

export function buildUrl(url: string, params: Params = {}): string {
  const queryString = getQueryString(params)
  return `${url}${queryString && '?' + queryString}`
}

const request = (
  method: string,
  url: string,
  body?: Data,
  headers?: Headers
) => {
  return fetch(url, {
    method,
    cache: 'no-cache',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body && JSON.stringify(body),
  })
}

export default {
  get: (url: string, params?: Params, headers?: Headers) =>
    request('get', buildUrl(url, params), undefined, headers),

  post: (url: string, data?: Data, headers?: Headers) =>
    request('post', url, data, headers),
}
