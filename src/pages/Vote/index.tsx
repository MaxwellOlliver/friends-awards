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
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/Button";
import { categories } from "@/constants/categories";

export const Vote = () => {
  const navigate = useNavigate();
  const category = categories[0];

  const [selectedNominee, setSelectedNominee] = useState<string | null>(null);

  const handleRegisterVote = () => {
    if (selectedNominee) {
      navigate({
        to: "/vote-registered/$session",
        params: { session: category.id },
        search: { hasVoted: true },
      });
    }
  };

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
        {category.name}
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
            key={nominee}
            className={cn(
              "w-full flex items-center rounded-md text-white px-4 py-2 gap-2 hover:bg-[#202020] transition-colors min-w-0",
              {
                "bg-white text-black hover:bg-white":
                  selectedNominee === nominee,
              }
            )}
            onClick={() => setSelectedNominee(nominee)}
            style={{
              animationDelay: `${1000 + index * 200}ms`,
              animationFillMode: "forwards",
            }}
          >
            <div
              className={cn(
                "size-4 min-w-4 border-white border rounded-full flex items-center justify-center",
                {
                  "bg-primary": selectedNominee === nominee,
                }
              )}
            >
              {selectedNominee === nominee && (
                <Check className="size-3 stroke-white" />
              )}
            </div>
            <span className="text-wrap break-words min-w-0 text-left">
              {nominee}
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
        >
          Registrar voto
        </Button>
      </footer>
    </div>
  );
};
