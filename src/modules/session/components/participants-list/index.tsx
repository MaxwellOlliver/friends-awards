import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/utils/cn";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Avatar } from "./avatar";
import { useSession } from "../../contexts/session-context";
import { Emotes } from "./emotes";
import { useEffect, useRef, useState } from "react";

export const ParticipantsList = () => {
  const [emotes, setEmotes] = useState<Map<string, string>>(new Map());
  const [canEmote, setCanEmote] = useState(true);

  const navigate = useNavigate();
  const { connectedParticipants, participants } = useSession();
  const user = useAuthStore((state) => state.user);

  const timeoutMapRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

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
    <div className="flex flex-col gap-2 pr-2 overflow-y-auto max-h-96 h-96 pt-4">
      {participants.map((participant, index) => {
        const isUserConnected = connectedParticipants.includes(participant.id);
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
                {participant.name} {isMe && "(Eu)"}
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
