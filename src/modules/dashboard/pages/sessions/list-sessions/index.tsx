import { Input } from "@/components/Input";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/Button";
import { Session } from "./session";
import { Session as SessionType } from "@/modules/session/types/session";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { sessionService } from "@/modules/session/services/session";
import { tryCatch } from "@/utils/error";
import { addToastWithError } from "@/lib/toast";
import { Loader } from "@/components/Loader";

export const ListSessions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sessions, setSessions] = useState<SessionType[]>([]);

  const fetchSessions = async () => {
    const [error, data] = await tryCatch(sessionService.getSessions());

    if (error) {
      addToastWithError({
        title: "Erro ao buscar sessões",
        error,
      });
      return;
    }

    setSessions(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSessions();
  }, []);
  const navigate = useNavigate();

  const handleGoToCreateSession = () => {
    navigate({
      to: "/dashboard/create-session",
      mask: {
        to: "/dashboard/my-sessions",
      },
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl font-bold mb-4">Minhas sessões</h1>
      <header className="flex gap-4">
        <Input
          placeholder="Pesquisar sessões"
          iconLeft={Search}
          disabled={isLoading}
        />
        <Button
          color="primary"
          iconLeft={Plus}
          onClick={handleGoToCreateSession}
          disabled={isLoading}
        >
          Nova sessão
        </Button>
      </header>
      <div className="w-full grid grid-cols-1 gap-4">
        {isLoading ? (
          <div className="w-full p-8 flex justify-center">
            <Loader />
          </div>
        ) : (
          sessions.map((session) => (
            <Session key={session.id} session={session} />
          ))
        )}
      </div>
    </div>
  );
};
