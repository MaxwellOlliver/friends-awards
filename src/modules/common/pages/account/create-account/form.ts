import { YupCore } from "@/lib/yup";

export type CreateAccountFormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const schema = YupCore.object<CreateAccountFormData>().shape({
  username: YupCore.string().required(),
  email: YupCore.string().email().required(),
  password: YupCore.string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .required(),
  confirmPassword: YupCore.string()
    .oneOf([YupCore.ref("password")], "Senhas não coincidem")
    .required(),
});
