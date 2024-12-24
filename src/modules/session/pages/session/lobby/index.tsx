import { Loader } from "@/components/Loader";
import { LayoutPage } from "@/layout/components/LayoutPage";
import { addToastWithError } from "@/lib/toast";
import { sessionService } from "@/modules/session/services/session";
import { Session } from "@/modules/session/types/session";
import { tryCatch } from "@/utils/error";
import { useNavigate, useParams } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Emotes } from "./emotes";
import { Avatar } from "./avatar";
import { useAuthStore } from "@/store/auth-store";

export const Lobby = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([
    "Max",
    "João",
    "Dudu gay",
  ]);
  const [emotes, setEmotes] = useState<Map<string, string>>(new Map());
  const [canEmote, setCanEmote] = useState(true);
  const [loading, setLoading] = useState(true);

  const timeoutMapRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const user = useAuthStore((state) => state.user);
  const params = useParams({
    from: "/_auth/session/$sessionId/lobby",
  });
  const navigate = useNavigate();

  const addEmote = (emote: string, participant: string) => {
    setEmotes((prev) => {
      const newEmotes = new Map(prev);
      newEmotes.set(participant, emote);

      return newEmotes;
    });

    if (participant === user?.name) {
      // emit socket event
    }

    const timeoutId = setTimeout(() => {
      setEmotes((prev) => {
        const newEmotes = new Map(prev);
        newEmotes.delete(participant);

        return newEmotes;
      });
      timeoutMapRef.current.delete(participant);
    }, 5000);

    const canEmoteTimeoutId = setTimeout(() => {
      setCanEmote(true);
    }, 30000);

    timeoutMapRef.current.set(participant, timeoutId);
    timeoutMapRef.current.set("can-emote", canEmoteTimeoutId);
    setCanEmote(false);
  };

  const fetchSession = async () => {
    const [error, sessionData] = await tryCatch(
      sessionService.getSession(params.sessionId)
    );

    if (error) {
      addToastWithError({
        title: "Erro ao buscar sessão",
        error,
      });
      return;
    }

    setSession(sessionData);
    setLoading(false);
  };

  // useEffect(() => {
  //   fetchSession();
  // }, []);

  useEffect(() => {
    return () => {
      timeoutMapRef.current.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
    };
  }, []);

  return (
    <LayoutPage>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col p-4 w-full">
          <h1 className="text-xl ">
            Sessão{" "}
            <span className="text-secondary-500">{params.sessionId}</span>
          </h1>
          <h1 className="text-4xl font-bold mb-8 break-words">
            Game of the year
          </h1>

          <h1 className="text-lg">Próxima categoria</h1>
          <h1 className="text-2xl font-bold">Jogador Revelação</h1>

          <div className="flex items-center gap-4 mt-12">
            <Loader />
            <span>Aguardando host iniciar votação...</span>
          </div>
        </div>
        <div className="flex flex-col p-4 w-full">
          <div className="flex items-center gap-4 justify-between w-full">
            <h1 className="text-lg text-primary-500">
              Participantes ({connectedUsers.length}/5)
            </h1>
            <Emotes addEmote={addEmote} canEmote={canEmote} />
          </div>

          <div className="flex flex-col gap-2 pr-2 mt-4 overflow-y-auto h-96 pt-4">
            {[
              "Max",
              "João",
              "Dudu gay",
              "Carlos",
              "Maria",
              "Pedrinho",
              "Ama",
              "Sofia",
            ].map((name, index) => {
              const isUserConnected = connectedUsers.includes(name);
              const isMe = name === user?.name;

              return (
                <div
                  className={cn(
                    "flex items-center justify-between gap-2 p-4 rounded-md w-full",
                    {
                      "opacity-30": !isUserConnected,
                      "bg-primary bg-opacity-15": isMe,
                    }
                  )}
                  key={index}
                >
                  <div className="flex items-center gap-2">
                    <Avatar emote={emotes.get(name) || null} />

                    <span>
                      {name} {isMe && "(Eu)"}
                    </span>
                  </div>
                  {isMe && (
                    <button onClick={() => navigate({ to: "/dashboard/home" })}>
                      <LogOut
                        className="size-4 text-error cursor-pointer"
                        aria-label="Sair da sessão"
                      />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </LayoutPage>
  );
};
