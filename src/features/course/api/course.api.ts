import { urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';

const ApiBaseService = createApiInstance(urlApiServices as string);
const URL_QUESTION = `${urlApiServices}`;

export const requestAllCourse = (): Promise<ResponseApi<any>> => {
  return ApiBaseService.get(`${URL_QUESTION}/Coursies`);
};

export const requestCourseList = (payload: unknown): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL_QUESTION}/List-Course`, payload);
};

export const requestCreateCourse = (payload: unknown): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL_QUESTION}/Course`, payload);
};

export const requestDetailCourse = (id: string | undefined): Promise<ResponseApi<any>> => {
  return ApiBaseService.get(`${URL_QUESTION}/CoursById/${id}`);
};

export const requestUpdateCourse = (payload: object): Promise<ResponseApi<any>> => {
  return ApiBaseService.put(`${URL_QUESTION}/Course`, payload);
};

export const requestDeleteCourse = (id: string | number): Promise<ResponseApi<any>> => {
  return ApiBaseService.delete(`${URL_QUESTION}/Course/${id}`);
};
