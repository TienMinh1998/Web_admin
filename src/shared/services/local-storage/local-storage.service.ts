import { LOCAL_STORAGE_KEYS } from './keys'

export const LocalStorageService = {
  get: (key: LOCAL_STORAGE_KEYS) =>
    JSON.parse(window.localStorage.getItem(key) as string),
  set: (key: LOCAL_STORAGE_KEYS, value: { [key: string]: any }) =>
    window.localStorage.setItem(key as string, JSON.stringify(value)),
  clear: (key: LOCAL_STORAGE_KEYS) => window.localStorage.removeItem(key),
}
