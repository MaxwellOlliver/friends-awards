export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface AuthServiceDescriptor {
  login: (payload: LoginPayload) => Promise<LoginResponse>;
  refreshToken: () => Promise<LoginResponse>;
}
