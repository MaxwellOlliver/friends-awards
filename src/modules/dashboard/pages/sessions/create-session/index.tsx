import { PageModal } from "@/components/PageModal";
import { useNavigate } from "@tanstack/react-router";
import { FormProvider, useForm } from "react-hook-form";
import { SessionForm } from "./session-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";

export const CreateSession = () => {
  const navigate = useNavigate();
  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  return (
    <PageModal
      isOpen
      onClose={() => navigate({ to: "/dashboard/my-sessions" })}
    >
      <FormProvider {...methods}>
        <SessionForm />
      </FormProvider>
    </PageModal>
  );
};
