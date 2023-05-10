import { urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';

const ApiBaseService = createApiInstance(urlApiServices as string);
const URL = `${urlApiServices}/reading`;

export const requestPosts = (payload: unknown): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL}/search`, payload);
};

export const requestCreatePost = (payload: unknown): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL}/add`, payload);
};

export const requestDetailPost = (id: string | undefined): Promise<ResponseApi<any>> => {
  return ApiBaseService.get(`${URL}/${id}`);
};

export const requestUpdatePost = (payload: object): Promise<ResponseApi<any>> => {
  return ApiBaseService.put(`${URL}/update`, payload);
};

export const requestDeletePost = (id: string | number): Promise<ResponseApi<any>> => {
  return ApiBaseService.delete(`${URL}/${id}`);
};
