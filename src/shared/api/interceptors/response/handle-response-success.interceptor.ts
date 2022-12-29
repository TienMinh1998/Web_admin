import { AxiosResponse } from 'axios';
import { API_STATUS } from 'config/api-status';
import { toastConfig } from 'config/notify';
import { toast } from 'react-toastify';

export async function handleResponseSuccess(response: AxiosResponse) {
  const { data } = response;
  if (
    data &&
    [API_STATUS.NOTFOUND, API_STATUS.FORBIDDEN, API_STATUS.SERVER, API_STATUS.BAD_REQUEST].includes(
      data.status
    )
  ) {
    toast.error(data.message, { ...toastConfig, toastId: 'errorResponse' });
    return Promise.reject(data);
  }

  return Promise.resolve(data);
}
