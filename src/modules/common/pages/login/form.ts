import { YupCore } from "@/lib/yup";

export type LoginFormData = {
  email: string;
  password: string;
};

export const schema = YupCore.object<LoginFormData>().shape({
  email: YupCore.string().email().required(),
  password: YupCore.string().required(),
});
