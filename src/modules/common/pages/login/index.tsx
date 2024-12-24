import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Input } from "@/components/Input";
import {
  Crown,
  Gamepad2,
  Lock,
  LogIn,
  Mail,
  Medal,
  Trophy,
} from "lucide-react";
import { LayoutPage } from "@/layout/components/LayoutPage";
import { Button } from "@/components/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { tryCatch } from "@/utils/error";
import { useAuthStore } from "@/store/auth-store";
import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import { LoginFormData, schema } from "./form";
import { addToast } from "@/lib/toast";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const search = useSearch({
    from: "/",
  });

  const login = useAuthStore((state) => state.login);

  const handleSubmit = useCallback(
    async (data: LoginFormData) => {
      setIsLoading(true);
      const [error] = await tryCatch(login(data), [AxiosError]);

      console.log(error);

      if (error) {
        addToast({
          title: "Erro ao fazer login",
          message: "Verifique suas credenciais e tente novamente.",
          type: "error",
        });
        setIsLoading(false);
        form.resetField("password");
        setTimeout(() => form.setFocus("email", { shouldSelect: true }), 50);
        return;
      }

      navigate({
        to: search.redirect ?? "/dashboard/home",
      });
    },
    [form, login, navigate, search.redirect]
  );

  const isDirty = Object.keys(form.formState.touchedFields).length > 0;

  return (
    <LayoutPage>
      <div className="w-full grid grid-cols-1 gap-24 flex-col-reverse md:grid-cols-2 md:gap-12">
        <div className="flex w-full flex-col">
          <h1 className="text-4xl font-semibold mb-4">Bem vindo!</h1>
          <h4 className="mb-8 ">
            Reúna aqueles seus amigos e façam seu próprio show de premiações!
          </h4>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <Input
              label="Email"
              placeholder="jonh@dominio.com"
              {...form.register("email")}
              iconLeft={Mail}
              error={form.formState.errors.email?.message}
              disabled={isLoading}
            />

            <Input
              type="password"
              label="Senha"
              placeholder="•••••••"
              {...form.register("password")}
              iconLeft={Lock}
              error={form.formState.errors.password?.message}
              disabled={isLoading}
            />

            <Button
              color="primary"
              className="!w-full mt-12"
              type="submit"
              iconLeft={LogIn}
              isLoading={isLoading}
              disabled={!isDirty}
            >
              Entrar
            </Button>
          </form>
          <p className="text-sm mt-4">
            Ainda não possui uma conta? Crie agora clicando{" "}
            <Link className="text-primary-500 underline" to="/signup">
              aqui!
            </Link>
          </p>
        </div>
        <div className="w-full flex flex-col h-full bg-primary p-8 rounded-md gap-12 order-first md:order-last">
          <h1 className="text-4xl font-semibold">
            Crie seu próprio Award Show!
          </h1>
          <h4 className="text-lg">
            Defina categorias, convide seus amigos e faça sua própria premiação.
          </h4>
          <div className="flex gap-4 text-white">
            <Gamepad2 className="size-8" />
            <Crown className="size-8" />
            <Trophy className="size-8" />
            <Medal className="size-8" />
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};
