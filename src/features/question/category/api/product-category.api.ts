import { urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';
import { RequestDeleteResponse, UploadImageResponse } from 'shared/types/interface';
import { DataCategoryStoreResponse, TCategoryStore } from '../types/category-store';

const ApiBaseService = createApiInstance(urlApiServices as string);

export const requestCategoryStore = (
  payload: unknown
): Promise<ResponseApi<DataCategoryStoreResponse[]>> => {
  return ApiBaseService.get(`${urlApiServices}/item-category`, {
    params: payload
  });
};

export const requestCreateCategoryStore = (
  payload: object
): Promise<ResponseApi<TCategoryStore>> => {
  return ApiBaseService.post(`${urlApiServices}/item-category`, payload);
};

export const requestDetailCategoryStore = (
  id: string | undefined
): Promise<ResponseApi<DataCategoryStoreResponse>> => {
  return ApiBaseService.get(`${urlApiServices}/item-category/${id}`);
};

export const requestUpdateCategoryStore = (
  id: string,
  payload: object
): Promise<ResponseApi<TCategoryStore>> => {
  return ApiBaseService.put(`${urlApiServices}/item-category/${id}`, payload);
};

export const deleteCategoryStore = (id: string): Promise<ResponseApi<RequestDeleteResponse>> => {
  return ApiBaseService.delete(`${urlApiServices}/item-category/${id}`);
};
