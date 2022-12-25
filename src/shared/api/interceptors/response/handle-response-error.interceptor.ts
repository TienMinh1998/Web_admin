import { API_STATUS } from 'config/api-status';
import { toastConfig } from 'config/notify';
import { requestAccessToken } from 'features/auth/api/auth.api';
import { toast } from 'react-toastify';
import { CliCookieService, CLI_COOKIE_KEYS } from 'shared/services/cli-cookie';

type ErrorApiResponse = {
  response: {
    config: { url: string };
    data: {
      code: number;
      message: string;
    };
  };
} & Error;

const URL_REFRESH_TOKEN = '/api/iam/v1/auth/refresh-token';
const checkRequestRefreshToken = (url: string, message: string) => {
  if (url === URL_REFRESH_TOKEN) {
    // If call api refreshToken is unauthorized => logout
    toast.error(message, { ...toastConfig, toastId: 'errorResponse' });
    CliCookieService.set(CLI_COOKIE_KEYS.ACCESS_TOKEN, '');
    CliCookieService.set(CLI_COOKIE_KEYS.REFRESH_TOKEN, '');
    window.location.pathname = '/login';
    return false;
  }
  return true;
};
export async function handleResponseError(error: ErrorApiResponse) {
  const { data, config } = error.response;

  if (data && data.code === API_STATUS.UNAUTHORIZED) {
    try {
      if (!checkRequestRefreshToken(config.url, data.message)) {
        console.log('RUN2');

        const res = await requestAccessToken();
        CliCookieService.set(CLI_COOKIE_KEYS.ACCESS_TOKEN, res.data.accessToken?.replace(/"/g, ''));
        CliCookieService.set(
          CLI_COOKIE_KEYS.REFRESH_TOKEN,
          res.data.refreshToken?.replace(/"/g, '')
        );
      }
    } catch (error) {
      console.error('Exception ' + error);
    }
  }

  if (
    data &&
    [API_STATUS.NOTFOUND, API_STATUS.FORBIDDEN, API_STATUS.SERVER, API_STATUS.BAD_REQUEST].includes(
      data.code
    )
  ) {
    toast.error(data.message, { ...toastConfig, toastId: 'errorResponse' });
  }

  return Promise.reject(error);
}
