import { urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';

const ApiBaseService = createApiInstance(urlApiServices as string);
const URL = `${urlApiServices}/phrase`;

export const requestPhrases = (payload: unknown): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL}/lists`, payload);
};

export const requestDeletePhrase = (id: string | number): Promise<ResponseApi<any>> => {
  return ApiBaseService.delete(`${URL}/${id}`);
};
