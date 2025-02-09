import { useState } from "react";
import {
  Check,
  Crown,
  Gamepad2,
  Medal,
  Trophy,
  Vote as VoteIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/Button";
import { tryCatch } from "@/utils/error";
import { gameDataService } from "../../services/game-data";
import { addToastWithError } from "@/lib/toast";
import { useSession } from "../../contexts/session-context";

interface VoteFormProps {
  onVoteRegistered: (nomineeId: string) => void;
}

export const VoteForm = ({ onVoteRegistered }: VoteFormProps) => {
  const [selectedNominee, setSelectedNominee] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { categories, gameData, session } = useSession();

  const category = categories.find(
    (category) => category.id === gameData?.currentCategory
  );

  const handleRegisterVote = async () => {
    if (selectedNominee) {
      setIsLoading(true);
      const [error] = await tryCatch(
        gameDataService.vote(session!.id, selectedNominee)
      );

      if (error) {
        addToastWithError({
          title: "Erro ao votar",
          error,
        });
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      onVoteRegistered(selectedNominee);
    }
  };

  if (!category) {
    return <></>;
  }

  return (
    <div className="flex flex-col max-w-[900px] pb-12">
      <div className="flex gap-4 text-white mb-8">
        <Gamepad2 className="size-8" />
        <Crown className="size-8" />
        <Trophy className="size-8" />
        <Medal className="size-8" />
      </div>
      <h1
        className="text-4xl font-bold mb-2"
        style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
      >
        {category.title}
      </h1>
      <h5
        className="text-1xl font-light mb-12"
        style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
      >
        {category.description}
      </h5>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {category.nominees.map((nominee, index) => (
          <button
            key={nominee.id}
            className={cn(
              "w-full flex items-center rounded-md text-white px-4 outline-none py-2 gap-2 hover:bg-[#202020] transition-colors min-w-0",
              {
                "bg-white text-black hover:bg-white":
                  selectedNominee === nominee.id,
              }
            )}
            onClick={() => setSelectedNominee(nominee.id)}
            style={{
              animationDelay: `${1000 + index * 200}ms`,
              animationFillMode: "forwards",
            }}
          >
            <div
              className={cn(
                "size-4 min-w-4 border-white border rounded-full flex items-center justify-center",
                {
                  "bg-primary": selectedNominee === nominee.id,
                }
              )}
            >
              {selectedNominee === nominee.id && (
                <Check className="size-3 stroke-white" />
              )}
            </div>
            <span className="text-wrap break-words min-w-0 text-left">
              {nominee.title}
            </span>
          </button>
        ))}
      </div>
      <footer className="mt-12">
        <Button
          color="primary"
          onClick={handleRegisterVote}
          disabled={!selectedNominee}
          iconLeft={VoteIcon}
          className="w-full"
          isLoading={isLoading}
        >
          Registrar voto
        </Button>
      </footer>
    </div>
  );
};
