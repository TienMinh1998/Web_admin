import { urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';

const ApiBaseService = createApiInstance(urlApiServices as string);
const URL = `${urlApiServices}/phrase`;

export const requestPhrases = (payload: unknown): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL}/lists`, payload);
};
export const importPhrases = (payload: unknown): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL}/import/excel`, payload);
};

export const requestCreatePhrases = (payload: unknown): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL}/add`, payload);
};

export const requestUpdatePhrases = (payload: object): Promise<ResponseApi<any>> => {
  return ApiBaseService.put(`${URL}/edit`, payload);
};

export const requestPhrasesById = (payload: any): Promise<ResponseApi<any>> => {
  return ApiBaseService.get(`${URL}/${payload.id}`);
};

export const requestDeletePhrase = (id: string | number): Promise<ResponseApi<any>> => {
  return ApiBaseService.delete(`${URL}/${id}`);
};
