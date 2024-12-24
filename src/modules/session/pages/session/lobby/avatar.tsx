import DefaultAvatar from "@/assets/images/default-avatar.jpg";
import { emotes } from "@/modules/session/constants/emotes";

export const Avatar = ({ emote }: { emote: string | null }) => {
  const emoteToShow = emote ? emotes.find((e) => e.code === emote) : null;

  return (
    <>
      <div className="relative">
        <img
          src={DefaultAvatar}
          alt="Avatar"
          className="size-8 rounded-full"
          about="Avatar - credits to https://www.freepik.com/author/catalyststuff"
        />
        {emoteToShow && (
          <div className="absolute -top-3/4 -right-3/4 bg-white p-1 rounded-md shadow-md rounded-bl-none ring-2 ring-primary-500 animate-fade-in">
            <img src={emoteToShow.image} alt="Emote" className="size-6" />
          </div>
        )}
      </div>
    </>
  );
};
