import Cookies from 'js-cookie';
import { isEmpty } from 'lodash';
import { CLI_COOKIE_KEYS } from './keys';

export const CliCookieService = {
  get: (key: CLI_COOKIE_KEYS) => {
    const value = Cookies.get(key);
    if (!isEmpty(value)) return JSON.parse(value as string);
  },
  set: (key: CLI_COOKIE_KEYS, value: { [key: string]: string[] } | string) =>
    Cookies.set(key, JSON.stringify(value)),
  clear: (key: CLI_COOKIE_KEYS) => Cookies.remove(key)
};
