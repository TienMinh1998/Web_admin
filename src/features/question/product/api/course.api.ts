import { urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';

const ApiBaseService = createApiInstance(urlApiServices as string);
const URL_QUESTION = `${urlApiServices}`;

export const requestAllCourse = (): Promise<ResponseApi<any>> => {
  return ApiBaseService.get(`${URL_QUESTION}/Cours`);
};
