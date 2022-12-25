export * from './profile';

// export type ProfileResponse = {};

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};
// export type RegisterResponse = {};

export type LoginRequest = {
  userName: string;
  password: string;
};
