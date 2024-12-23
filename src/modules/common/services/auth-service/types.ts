export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface AuthServiceDescriptor {
  login: (payload: LoginPayload) => Promise<LoginResponse>;
}
