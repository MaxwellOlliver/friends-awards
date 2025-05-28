import { Plus, Search } from "lucide-react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Session } from "../../sessions/list-sessions/session";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import type { Session as SessionType } from "@/modules/session/types/session";
import { tryCatch } from "@/utils/error";
import { sessionService } from "@/modules/session/services/session";
import { addToastWithError } from "@/lib/toast";
import { Loader } from "@/components/Loader";

export const RecentSessions = () => {
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

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-4">Minhas sessões em votação</h1>
      <header className="flex gap-4">
        <Input
          placeholder="Pesquisar sessões"
          iconLeft={Search}
          disabled={isLoading}
        />
        <Button color="primary" iconLeft={Plus} disabled={isLoading}>
          Nova sessão
        </Button>
      </header>
      <div className="w-full grid grid-cols-1 gap-4">
        {isLoading ? (
          <div className="w-full p-8 flex justify-center">
            <Loader />
          </div>
        ) : (
          sessions.map((session, index) => (
            <Session key={index} session={session} />
          ))
        )}
      </div>
      <Link
        to="/dashboard/my-sessions"
        className="text-primary hover:underline text-sm w-fit self-end"
        resetScroll={false}
      >
        Ver todas as sessões
      </Link>
    </div>
  );
};
