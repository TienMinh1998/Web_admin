import { urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';

const ApiBaseService = createApiInstance(urlApiServices as string);
const URL_QUESTION = `${urlApiServices}`;

export const requestAllTopicByCourseId = (payload: any): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL_QUESTION}/GetTopicByCoursId`, payload);
};
export const requestTopicList = (payload: any): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL_QUESTION}/List-toppic`, payload);
};
export const requestCreateTopic = (payload: unknown): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL_QUESTION}/AddTopic`, payload);
};

export const requestDetailTopic = (id: string | undefined): Promise<ResponseApi<any>> => {
  return ApiBaseService.get(`${URL_QUESTION}/GetTopicById/${id}`);
};

export const requestUpdateTopic = (payload: object): Promise<ResponseApi<any>> => {
  return ApiBaseService.put(`${URL_QUESTION}/UpdateTopic`, payload);
};

export const requestUploadImage = (payload: object): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL_QUESTION}/UploadImage`, payload);
};

export const requestDeleteTopic = (id: string | number): Promise<ResponseApi<any>> => {
  return ApiBaseService.delete(`${URL_QUESTION}/topic/${id}`);
};
