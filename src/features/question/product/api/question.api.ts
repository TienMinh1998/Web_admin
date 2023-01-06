import { urlApiServices } from 'config/configuration';
import { createApiInstance } from 'shared/api';
import { ResponseApi } from 'shared/api/types';
import { TProductStore } from '../types/interface';

const ApiBaseService = createApiInstance(urlApiServices as string);
const URL_QUESTION = `${urlApiServices}/QuestionStandard`;

export const requestAllQuestion = (payload: unknown): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL_QUESTION}/AllQuestion`, payload);
};

export const requestCreateQuestion = (payload: TProductStore): Promise<ResponseApi<any>> => {
  return ApiBaseService.post(`${URL_QUESTION}/AddStandardQuestion`, payload);
};

export const requestDetailQuestion = (id: string | undefined): Promise<ResponseApi<any>> => {
  return ApiBaseService.get(`${URL_QUESTION}/GetQuestionById/${id}`);
};

export const requestUpdateQuestion = (payload: object): Promise<ResponseApi<any>> => {
  return ApiBaseService.put(`${URL_QUESTION}/UpdateQuestionStandard`, payload);
};

export const requestDeleteQuestion = (id: string | number): Promise<ResponseApi<any>> => {
  return ApiBaseService.delete(`${URL_QUESTION}/QuestionStandard/${id}`);
};

export const requestAddQuestionToTopic = (payload: object): Promise<ResponseApi<any>> => {
  return ApiBaseService.put(`${URL_QUESTION}/AddQuestionToTopic`, payload);
};
