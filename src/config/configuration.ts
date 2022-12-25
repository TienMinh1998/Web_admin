type EnvironmentType = 'test' | 'production';
type TokenType = '' | 'Bearer' | 'Basic';

type ConfigurationValidator = {
  ENVIRONMENT: EnvironmentType;
  AUTHORIZATION_KEY: string;
  TYPE_TOKEN?: TokenType;
  API_TIMEOUT_REQUEST?: number;
};

export const configuration: ConfigurationValidator = {
  ENVIRONMENT: process.env.NODE_ENV as EnvironmentType,
  AUTHORIZATION_KEY: 'Authorization',
  TYPE_TOKEN: 'Bearer',
  API_TIMEOUT_REQUEST: 20000
};

export const urlApiServices = process.env.REACT_APP_API;
