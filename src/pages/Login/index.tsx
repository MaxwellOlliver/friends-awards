import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { schema } from "./form";
import type { LoginFormData } from "./form";
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
import { useAuth } from "@/contexts/auth-context";
import { tryCatch } from "@/utils/error";

export const Login = () => {
  const form = useForm<LoginFormData>({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const search = useSearch({
    from: "/",
  });

  const { login } = useAuth();

  const handleSubmit = async (data: LoginFormData) => {
    console.log(data);

    const [error, loginData] = await tryCatch(login(data));

    if (error) {
      console.error(error);
      return;
    }
    console.log(loginData);
    navigate({
      to: search.redirect ?? "/dashboard/home",
    });
  };

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
            />

            <Input
              type="password"
              label="Senha"
              placeholder="•••••••"
              {...form.register("password")}
              iconLeft={Lock}
              error={form.formState.errors.password?.message}
            />

            <Button
              color="primary"
              className="!w-full mt-12"
              type="submit"
              iconLeft={LogIn}
            >
              Entrar
            </Button>
          </form>
          <p className="text-sm mt-4">
            Ainda não possui uma conta? Crie agora clicando{" "}
            <Link
              className="text-primary underline"
              to="/dashboard/my-sessions"
            >
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
