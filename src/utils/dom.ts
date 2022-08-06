import ReactDOM from 'react-dom/client'
import type { RootOptions } from 'react-dom/client'

export const createReactRoot =(id: string = 'app', options?: RootOptions) => {
  const container = document.getElementById(id) as HTMLElement
  return ReactDOM.createRoot(container, options)
}