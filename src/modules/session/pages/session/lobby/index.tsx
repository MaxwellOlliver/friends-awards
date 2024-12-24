import { useEffect, useRef, useState } from "react";
import { Loader } from "@/components/Loader";
import { LayoutPage } from "@/layout/components/LayoutPage";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth-store";
import { ParticipantsList } from "@/modules/session/components/participants-list";
import { useSession } from "@/modules/session/contexts/session-context";
import { Emotes } from "./emotes";

export const Lobby = () => {
  const { connectedParticipants, participants } = useSession();
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
          <div className="flex items-center gap-4 mb-4 justify-between w-full">
            <h1 className="text-lg text-primary-500">
              Participantes ({connectedParticipants.length}/
              {participants.length})
            </h1>
            <Emotes addEmote={addEmote} canEmote={canEmote} />
          </div>
          <ParticipantsList emotes={emotes} />
        </div>
      </div>
    </LayoutPage>
  );
};
