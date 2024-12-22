import { use } from "react";
import { categories } from "../../../constants/categories";
import { VotesContext } from "../../../contexts/votes-context";
import { cn } from "../../../utils/cn";
import { Check, ChevronRight } from "lucide-react";

export const TabHistory = () => {
  const { activeTab, votes, setActiveTab } = use(VotesContext);

  return (
    <div className="flex flex-col items-end absolute top-12 right-12 gap-4">
      <div className="w-[2px] h-full absolute top-0 right-[5px] bg-[#444444] animate-fade-in"></div>
      {categories.map((category, index) => {
        const hasVoted = votes.has(category.id);

        return (
          <div
            key={category.id}
            className={cn("flex items-center z-20 animate-slide-in opacity-0", {
              "text-[#444444] [&_div]:bg-[#444444]": activeTab !== category.id,
              "text-[#EFA329] [&_div]:bg-[#EFA329]": hasVoted,
            })}
            style={{
              animationDelay: `${200 + index * 200}ms`,
              animationFillMode: "forwards",
            }}
          >
            {activeTab === category.id && <ChevronRight className="size-4" />}
            <span
              className="hover:text-white transition-all mr-12 cursor-pointer"
              onClick={() => setActiveTab(category.id)}
            >
              {category.name}
            </span>
            <div
              className={cn(
                "size-3 bg-white rounded-full flex items-center justify-center"
              )}
            ></div>
          </div>
        );
      })}
    </div>
  );
};
