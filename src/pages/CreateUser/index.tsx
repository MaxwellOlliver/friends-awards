import { Link } from "@tanstack/react-router";
import { CreateUserFormData, schema } from "./form";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import {
  Crown,
  Gamepad2,
  Lock,
  Mail,
  Medal,
  Trophy,
  UserPlus,
} from "lucide-react";
import { LayoutPage } from "@/layout/components/LayoutPage";
import { Button } from "@/components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

export const CreateUser = () => {
  const form = useForm<CreateUserFormData>({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const handleSubmit = (data: CreateUserFormData) => {
    console.log(data);
  };

  return (
    <LayoutPage>
      <div className="w-full grid grid-cols-1 gap-24 flex-col-reverse md:grid-cols-2 md:gap-12">
        <div className="flex w-full flex-col">
          <h1 className="text-4xl font-semibold mb-4">Criar conta</h1>
          <h4 className="mb-8 ">
            Reúna aqueles seus amigos e façam seu próprio show de premiações!
          </h4>
          <Form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-4"
          >
            <Input
              label="Nome de usuário"
              placeholder="NoobMaster69"
              {...form.register("name")}
              iconLeft={Mail}
              error={form.formState.errors.name?.message}
            />
            <Input
              label="Email"
              placeholder="mail@dominio.com"
              {...form.register("email")}
              iconLeft={Mail}
              error={form.formState.errors.email?.message}
            />
            <Input
              type="password"
              label="Senha"
              placeholder="•••••••"
              iconLeft={Lock}
              {...form.register("password")}
              error={form.formState.errors.password?.message}
            />

            <Input
              type="password"
              label="Confirmar Senha"
              placeholder="•••••••"
              {...form.register("confirmPassword")}
              iconLeft={Lock}
              error={form.formState.errors.confirmPassword?.message}
            />

            <Button
              color="primary"
              className="!w-full mt-12"
              type="submit"
              iconLeft={UserPlus}
            >
              Criar
            </Button>
          </Form>
          <p className="text-sm mt-4">
            Já possui uma conta? Faça login clicando{" "}
            <Link className="text-primary-500 underline" to="/">
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
