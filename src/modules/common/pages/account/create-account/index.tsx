import { Link, useNavigate } from "@tanstack/react-router";
import { CreateAccountFormData, schema } from "./form";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { Lock, Mail, User, UserPlus } from "lucide-react";
import { LayoutPage } from "@/layout/components/LayoutPage";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { tryCatch } from "@/utils/error";
import { accountService } from "@/modules/common/services/account-service";
import { AxiosError } from "axios";
import { useAuthStore } from "@/store/auth-store";
import { useState } from "react";
import { addToastWithError } from "@/lib/toast";

export const CreateAccount = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CreateAccountFormData>({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (data: CreateAccountFormData) => {
    setIsLoading(true);
    const [error] = await tryCatch(accountService.createAccount(data), [
      AxiosError,
    ]);

    if (error) {
      addToastWithError({
        error,
        title: "Erro ao criar conta",
      });
      setIsLoading(false);

      return;
    }

    const [loginError] = await tryCatch(login(data), [AxiosError]);

    if (loginError) {
      addToastWithError({
        error: loginError,
        title: "Erro ao fazer login",
      });
      setIsLoading(false);

      return;
    }

    navigate({
      to: "/menu",
    });
  };

  const isDirty = Object.keys(form.formState.touchedFields).length > 0;

  return (
    <LayoutPage>
      <div className="w-full grid gap-24  md:gap-12">
        <div className="flex w-full flex-col">
          <h1 className="text-4xl font-semibold mb-4">Criar conta</h1>
          <h4 className="mb-8 ">
            Reúna aqueles seus amigos e façam seu próprio show de premiações!
          </h4>
          <Form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Input
              label="Nome de usuário"
              placeholder="NoobMaster69"
              {...form.register("name")}
              iconLeft={User}
              error={form.formState.errors.name?.message}
              disabled={isLoading}
            />
            <Input
              label="Email"
              placeholder="mail@dominio.com"
              {...form.register("email")}
              iconLeft={Mail}
              error={form.formState.errors.email?.message}
              disabled={isLoading}
            />
            <Input
              type="password"
              label="Senha"
              placeholder="•••••••"
              iconLeft={Lock}
              {...form.register("password")}
              error={form.formState.errors.password?.message}
              disabled={isLoading}
            />
            <Input
              type="password"
              label="Confirmar Senha"
              placeholder="•••••••"
              {...form.register("confirmPassword")}
              iconLeft={Lock}
              error={form.formState.errors.confirmPassword?.message}
              isLoading={isLoading}
              disabled={isLoading}
            />
            <Button
              color="primary"
              className=" mt-12"
              type="submit"
              iconLeft={UserPlus}
              disabled={!isDirty}
            >
              Criar conta
            </Button>
          </Form>
          <p className="text-sm mt-4">
            Já possui uma conta? Faça login clicando{" "}
            <Link className="text-primary-500 underline" to="/">
              aqui!
            </Link>
          </p>
        </div>
      </div>
    </LayoutPage>
  );
};
