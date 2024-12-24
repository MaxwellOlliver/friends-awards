import { Loader } from "@/components/Loader";
import { LayoutPage } from "@/layout/components/LayoutPage";
import { addToastWithError } from "@/lib/toast";
import { sessionService } from "@/modules/session/services/session";
import { Session } from "@/modules/session/types/session";
import { tryCatch } from "@/utils/error";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Check, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { cn } from "@/utils/cn";
import { WaveEmote } from "./wave-emote";
import HandSvg from "@/assets/images/hand.svg";
import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/Button";

export const Lobby = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([
    "Max (Eu)",
    "João",
    "Dudu gay",
  ]);
  const [loading, setLoading] = useState(true);

  const params = useParams({
    from: "/_auth/session/$sessionId/lobby",
  });
  const navigate = useNavigate();

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

  return (
    <LayoutPage>
      <div className="w-full flex-col flex md:flex-row gap-8">
        <div className="flex flex-col p-4 w-full">
          <h1 className="text-xl ">
            Sessão{" "}
            <span className="text-secondary-500">{params.sessionId}</span>
          </h1>
          <h1 className="text-4xl font-bold mb-8">Game of the year</h1>

          <h1 className="text-lg">Próxima categoria</h1>
          <h1 className="text-2xl font-bold">Jogador Revelação</h1>

          <div className="flex items-center gap-4 mt-12">
            <Loader />
            <span>Aguardando host iniciar votação...</span>
          </div>
        </div>
        <div className="flex flex-col p-4 w-full">
          <h1 className="text-lg text-primary-500">
            Participantes ({connectedUsers.length}/5)
          </h1>

          <div className="flex flex-col gap-2 pr-2 mt-4 overflow-y-auto h-96">
            {[
              "Max (Eu)",
              "João",
              "Dudu gay",
              "Carlos",
              "Maria",
              "Pedrinho",
              "Ama",
              "Sofia",
            ].map((name, index) => {
              const isUserConnected = connectedUsers.includes(name);
              const isMe = name === "Max (Eu)";

              return (
                <div
                  className={cn(
                    "flex items-center justify-between gap-2 p-4 rounded-md w-full ",
                    {
                      "opacity-30": !isUserConnected,
                      "bg-primary bg-opacity-15": isMe,
                    }
                  )}
                  key={index}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={DefaultAvatar}
                      alt="Avatar"
                      className="size-8 rounded-full"
                      about="Avatar - credits to https://www.freepik.com/author/catalyststuff"
                    />

                    <span>{name}</span>
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
