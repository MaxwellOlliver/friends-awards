import { Popover } from "@/components/Popover";
import { emotes } from "@/modules/session/constants/emotes";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/utils/cn";
import { SmilePlus } from "lucide-react";

export const Emotes = ({
  addEmote,
  canEmote,
}: {
  addEmote: (emote: string, participant: string) => void;
  canEmote: boolean;
}) => {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return <></>;
  }

  return (
    <Popover
      content={({ onToggle }) => (
        <div className="flex flex-col gap-4 p-4 items-center bg-background-light rounded-md">
          <div className="grid grid-cols-4 gap-4">
            {emotes.map((emote) => (
              <button
                key={emote.code}
                className="flex items-center gap-4 p-4 hover:ring-2 outline-none focus:ring-2  ring-primary cursor-pointer rounded-md"
                onClick={() => {
                  addEmote(emote.code, user.name);
                  onToggle();
                }}
              >
                <img src={emote.image} alt={emote.name} className="w-10 h-10" />
              </button>
            ))}
          </div>
          <span className="text-xs text-secondary">
            Designed by{" "}
            <a href="https://freepik.com" className="underline" target="_blank">
              freepik
            </a>
          </span>
        </div>
      )}
      position="bottom-right"
    >
      {({ isOpen, onToggle }) => (
        <button
          className="disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onToggle}
          disabled={!canEmote}
        >
          <SmilePlus
            className={cn("size-5 text-secondary", {
              "text-primary": isOpen,
            })}
          />
        </button>
      )}
    </Popover>
  );
};
