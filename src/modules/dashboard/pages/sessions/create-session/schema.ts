import { YupCore } from "@/lib/yup";

export const schema = YupCore.object().shape({
  name: YupCore.string().required(),
  categories: YupCore.array()
    .of(
      YupCore.object().shape({
        name: YupCore.string().required(),
        description: YupCore.string().required(),
        nominees: YupCore.array().of(YupCore.string().required()).required(),
      })
    )
    .required(),
});
