import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/utils/cn";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Avatar } from "./avatar";
import { useSession } from "../../contexts/session-context";
import { Emotes } from "./emotes";
import { useEffect, useRef, useState } from "react";
import { CustomSocketEventMap, socket } from "@/http/socket";
import { SocketEvents } from "../../constants/socket-events";

export const ParticipantsList = () => {
  const [emotes, setEmotes] = useState<Map<string, string>>(new Map());
  const [canEmote, setCanEmote] = useState(true);

  const navigate = useNavigate();
  const { gameData, participants, session } = useSession();
  const user = useAuthStore((state) => state.user);

  const timeoutMapRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  const addEmote = (emote: string, participant: string) => {
    if (participant === user?.id && session) {
      socket.emit(SocketEvents.EMOTE, {
        emote,
        from: participant,
        sessionId: session.id,
      });
    }

    setEmotes((prev) => {
      const newEmotes = new Map(prev);
      newEmotes.set(participant, emote);

      return newEmotes;
    });

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

    if (participant === user?.id) {
      timeoutMapRef.current.set("can-emote", canEmoteTimeoutId);
      setCanEmote(false);
    }
  };

  useEffect(() => {
    function handleEmote(data: CustomSocketEventMap[SocketEvents.EMOTE]) {
      if (data.from === user?.id) return;

      addEmote(data.emote, data.from);
    }

    socket.on(SocketEvents.EMOTE, handleEmote);

    return () => {
      socket.off(SocketEvents.EMOTE, handleEmote);
    };
  }, [user]);

  useEffect(() => {
    return () => {
      timeoutMapRef.current.forEach((timeoutId) => {
        clearTimeout(timeoutId);
      });
    };
  }, []);

  const orderedParticipants = participants.sort((a) => {
    const isMe = a.id === user?.id;
    const isOnline = gameData?.connectedParticipants?.includes(a.id);

    if (isMe) return -1;

    if (isOnline) return -1;

    return 1;
  });

  return (
    <div className="flex flex-col gap-2 pr-2 overflow-y-auto max-h-96 h-96 pt-4">
      {orderedParticipants.map((participant, index) => {
        const isUserConnected = gameData?.connectedParticipants?.includes(
          participant.id
        );
        const isMe = participant.id === user?.id;

        return (
          <div
            className={cn(
              "flex items-center justify-between gap-2 p-4 rounded-md w-full bg-background-light",
              {
                "opacity-20": !isUserConnected,
                "bg-primary bg-opacity-15": isMe,
              }
            )}
            key={index}
          >
            <div className="flex items-center gap-2">
              <Avatar emote={emotes?.get(participant.id) || null} />

              <span>
                {participant.username} {isMe && "(Eu)"}
              </span>
              {isMe && <Emotes addEmote={addEmote} canEmote={canEmote} />}
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
  );
};
