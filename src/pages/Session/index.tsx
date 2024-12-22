import { Button } from "@/components/Button";
import { CategoryHistory } from "./category-history";
import { Crown, MailCheck, StopCircle, Users } from "lucide-react";
import { useSessionStore } from "@/store/session-store";
import { Loader } from "@/components/Loader";
import { useNavigate } from "@tanstack/react-router";
import { LogsPanel } from "./logs-panel";

export const Session = () => {
  const { state, changeState } = useSessionStore();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between gap-8 w-full max-w-[900px] p-8 flex-wrap md:flex-nowrap">
      <div className="w-full">
        <header className="flex gap-4 items-center flex-wrap">
          <h1 className="text-3xl font-semibold">Sessão 4029</h1>
          <div className="flex gap-1 items-center text-primary">
            <Users className="size-4" />
            <span className="text-sm">5</span>
          </div>
        </header>
        <div className="my-4 mb-16">
          <CategoryHistory />
        </div>
        {state === "voting" && (
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center gap-2">
              <Loader className="size-4" />
              <span>Aguardando votos (0/5)</span>
            </div>
            <Button
              color="white"
              icon={StopCircle}
              className="mt-8"
              onClick={() => changeState("voting-closed")}
            >
              Encerrar votação
            </Button>
          </div>
        )}
        {state === "voting-closed" && (
          <div className="flex flex-col gap-4 mt-8">
            <div className="flex items-center gap-2">
              <MailCheck className="size-4" />
              <span>Votos recebidos 4</span>
            </div>
            <Button
              color="white"
              icon={Crown}
              className="mt-8"
              onClick={() => navigate({ to: "/results" })}
            >
              Revelar vencedor
            </Button>
          </div>
        )}
        {state === "awaiting-session" && (
          <footer className="flex flex-col gap-4 mt-auto">
            <h4>Próxima categoria: Entretenimento do ano</h4>
            <Button color="white" onClick={() => changeState("voting")}>
              Iniciar votação
            </Button>
          </footer>
        )}
      </div>
      <LogsPanel />
    </div>
  );
};
