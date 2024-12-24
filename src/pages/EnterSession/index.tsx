import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, KeyRound, Users } from "lucide-react";
import { useState } from "react";

export const EnterSession = () => {
  const [sessionCode, setSessionCode] = useState<string>("");

  const navigate = useNavigate();

  const handleSessionCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionCode((e.target as HTMLInputElement).value);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center max-w-[900px] p-8 gap-4">
      <h1 className="text-3xl font-semibold">The friend Awards</h1>
      <h1 className="text-xl mb-8">2024</h1>
      <form action="" className="w-full max-w-[400px] flex flex-col gap-4">
        <Input
          iconLeft={Users}
          type="string"
          placeholder="Seu nome"
          onChange={handleSessionCodeChange}
          value={sessionCode}
        />
        <Input
          iconLeft={KeyRound}
          type="number"
          placeholder="Código da sessão"
          onChange={handleSessionCodeChange}
          value={sessionCode}
          maxLength={4}
        />
      </form>
      <div className="flex gap-4 flex-wrap w-full sm:w-fit mt-8">
        <Button
          color="primary"
          onClick={() =>
            navigate({
              to: "/enter-session",
            })
          }
          disabled={!/^[0-9]{4}$/.test(sessionCode)}
          icon={ArrowRight}
        >
          Entrar
        </Button>
        <Button
          color="ghost"
          onClick={() =>
            navigate({
              to: "/",
            })
          }
          icon={ArrowLeft}
        >
          Voltar
        </Button>
      </div>
    </div>
  );
};
