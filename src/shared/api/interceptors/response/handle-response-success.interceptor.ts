import { AxiosResponse } from 'axios';

export async function handleResponseSuccess(response: AxiosResponse) {
  return Promise.resolve(response.data);
}
