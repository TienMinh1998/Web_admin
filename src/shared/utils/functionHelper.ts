import { requestLogout } from 'features/auth/api/auth.api';
import { CliCookieService, CLI_COOKIE_KEYS } from 'shared/services/cli-cookie';

export const formatPrice = (value: string | number) => {
  if (!value || Number.isNaN(value)) return '';

  const result = value.toString().replace(/,/g, '');

  return result.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const isEmail = (value: string | undefined | null) => {
  if (!value) return false;
  return !/^[a-z][a-z0-9%_/.]{3,32}@[a-z0-9]{3,}(\.[a-z]{3,4}){1,2}$/i.test(value);
};

export const strongPassword = (value: string | undefined | null) => {
  value && !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])(?!.*['"]).{8,}$/.test(value)
    ? 'Must like Abc@1234'
    : undefined;
};

export const handleLogout = async () => {
  try {
    const res = await requestLogout();
    console.log('res: ', res);
    CliCookieService.set(CLI_COOKIE_KEYS.ACCESS_TOKEN, '');
    CliCookieService.set(CLI_COOKIE_KEYS.REFRESH_TOKEN, '');
  } catch (error) {
    console.error('Exception ' + error);
  }

  window.location.pathname = '/login';
};
