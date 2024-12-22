import { useContext, useState } from "react";
import { Category } from "@/types/categories";
import { VotesContext } from "@/contexts/votes-context";
import { ArrowRight, Check } from "lucide-react";
import { cn } from "@/utils/cn";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/Button";

export const CategoryVoting = ({
  category,
}: {
  category: Category;
  index: number;
}) => {
  const navigate = useNavigate();
  const { registerVote, votes } = useContext(VotesContext);
  const [selectedNominee, setSelectedNominee] = useState<string | null>(
    () => votes.get(category.id) || null
  );

  const handleRegisterVote = () => {
    if (selectedNominee) {
      registerVote(category.id, selectedNominee);
      navigate({
        to: "/vote-registered/$session",
        params: { session: category.id },
        search: { hasVoted: true },
      });
    }
  };

  return (
    <div className="flex flex-col max-w-[900px]">
      <h1
        className="text-4xl font-bold mb-4 animate-slide-down opacity-0"
        style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
      >
        {category.name}
      </h1>
      <h5
        className="text-1xl font-light mb-8 animate-slide-down opacity-0"
        style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
      >
        {category.description}
      </h5>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {category.nominees.map((nominee, index) => (
          <button
            key={nominee}
            className={cn(
              "w-full flex items-center opacity-0 rounded-full text-white px-4 py-2 gap-2 hover:bg-[#202020] transition-colors animate-slide-down",
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
                "size-4 border-white border rounded-full flex items-center justify-center",
                {
                  "bg-primary": selectedNominee === nominee,
                }
              )}
            >
              {selectedNominee === nominee && (
                <Check className="size-3 stroke-white" />
              )}
            </div>
            <span className="text-nowrap">{nominee}</span>
          </button>
        ))}
      </div>
      <Button
        color="white"
        onClick={handleRegisterVote}
        disabled={!selectedNominee}
        className="opacity-0 animate-slide-down mt-8"
        style={{
          animationDelay: `${1200 + category.nominees.length * 200}ms`,
          animationFillMode: "forwards",
        }}
        icon={ArrowRight}
      >
        Registrar voto
      </Button>
    </div>
  );
};
