import { Input } from "@/components/Input";
import { useFormContext } from "react-hook-form";
import { SessionFormData } from "../types";

export const SessionTab = () => {
  const { register } = useFormContext<SessionFormData>();

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <Input
        label="Nome da sessão"
        placeholder="Amigo do ano 2024"
        {...register("name")}
      />
    </div>
  );
};
