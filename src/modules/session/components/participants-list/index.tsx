import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/utils/cn";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { Avatar } from "./avatar";
import { useSession } from "../../contexts/session-context";

interface ParticipantsListProps {
  emotes?: Map<string, string>;
}

export const ParticipantsList = ({ emotes }: ParticipantsListProps) => {
  const navigate = useNavigate();
  const { connectedParticipants, participants } = useSession();
  const user = useAuthStore((state) => state.user);

  return (
    <div className="flex flex-col gap-2 pr-2 overflow-y-auto max-h-96 h-96 pt-4">
      {participants.map((participant, index) => {
        const isUserConnected = connectedParticipants.includes(participant.id);
        const isMe = participant.id === user?.id;

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
              <Avatar emote={emotes?.get(participant.id) || null} />

              <span>
                {participant.name} {isMe && "(Eu)"}
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
  );
};
