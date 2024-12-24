import { User } from "../../types/account";

export interface CreateAccountPayload {
  name: string;
  email: string;
  password: string;
}

export interface GetLoggedProfileResponse {
  participant: User;
}

export interface AccountServiceDescriptor {
  createAccount: (payload: CreateAccountPayload) => Promise<void>;
  getLoggedProfile: () => Promise<GetLoggedProfileResponse>;
}
