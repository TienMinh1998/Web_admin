import { urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';

const ApiBaseService = createApiInstance(urlApiServices as string);
const URL_QUESTION = `${urlApiServices}`;

export const requestAllTopicByCourseId = (payload: any): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL_QUESTION}/GetTopicByCoursId`, payload);
};
