import { urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';
import { RequestDeleteResponse } from 'shared/types/interface';
import { LoginRequest, LoginResponse } from '../types';

const ApiBaseService = createApiInstance(urlApiServices as string);

export const requestLogin = (payload: LoginRequest): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${urlApiServices}/Login_Admin`, payload);
};

export const requestLogout = (): Promise<ResponseApi<RequestDeleteResponse>> => {
  return ApiBaseService.delete(`${urlApiServices}/logout`);
};

export const requestAccessToken = (): Promise<ResponseApi<LoginResponse>> => {
  return ApiBaseService.post(`${urlApiServices}/refresh-token`);
};
