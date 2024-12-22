export interface CreateAccountPayload {
  name: string;
  email: string;
  password: string;
}

export interface AccountServiceDescriptor {
  createAccount: (payload: CreateAccountPayload) => Promise<void>;
}
