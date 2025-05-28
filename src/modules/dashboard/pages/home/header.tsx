import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { addToastWithError } from "@/lib/toast";
import { sessionService } from "@/modules/session/services/session";
import { tryCatch } from "@/utils/error";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Lock } from "lucide-react";
import { useRef, useState } from "react";

export const Header = () => {
  const [code, setCode] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isValidCode = /^[a-zA-Z0-9]*$/.test(e.target.value);

    if (!isValidCode) return;

    setCode(e.target.value);
  };

  const handleJoinSession = async () => {
    if (code.length !== 6) {
      inputRef.current?.focus();
      return;
    }

    setIsJoining(true);

    const [error, data] = await tryCatch(sessionService.joinSession(code));

    if (error) {
      addToastWithError({
        title: "Erro ao entrar na sessão",
        error,
      });
      setIsJoining(false);
      return;
    }

    navigate({
      to: "/session/$sessionId/participant",
      params: {
        sessionId: data.session.id,
      },
    });
  };

  return (
    <header className="p-8 rounded-md grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-12 mb-12 bg-secondary-700">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Juntar-se à uma sessão</h1>
        <h4>
          Para se juntar à uma sessão, insira o código ao lado ou solicite o
          link da sessão ao host.
        </h4>
      </div>
      <div className="flex gap-4 items-center">
        <Input
          containerClassName="bg-[#333] dark:bg-[#33333340] border-none"
          className="placeholder:text-[#ffffff70]"
          iconClassName="text-white"
          placeholder="Código da sessão"
          iconLeft={Lock}
          maxLength={6}
          type="number"
          value={code}
          onChange={handleChange}
          ref={inputRef}
          disabled={isJoining}
        />
        <Button
          color="primary"
          className="!ring-offset-secondary"
          aria-label="Entrar na sessão"
          onClick={handleJoinSession}
          isLoading={isJoining}
        >
          <ArrowRight className="size-5" />
        </Button>
      </div>
    </header>
  );
};
