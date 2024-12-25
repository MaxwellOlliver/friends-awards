import { Accordion } from "@/components/Accordion";
import { Tooltip } from "@/components/Tooltip";
import { categories } from "@/constants/categories";
import { ChevronRight, Clock, ClockArrowUp, Vote } from "lucide-react";
import { useSession } from "../../contexts/session-context";
import { useAuthStore } from "@/store/auth-store";

export const CategoriesList = () => {
  const { participants } = useSession();
  const user = useAuthStore((state) => state.user);

  const isHost = participants.find(
    (participant) => participant.id === user?.id
  )?.isHost;

  return (
    <div className="flex flex-col gap-4 w-full h-96 overflow-y-auto pr-2">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col bg-background-light p-4 rounded-md"
        >
          <div className="flex items-center gap-2 justify-between">
            <span className="text-xl font-bold ">{category.name}</span>
            <Tooltip text="Votação realizada" position="left">
              {/* <Vote className="text-success size-4" /> */}
              <Clock className="text-gray-400 size-4" />
            </Tooltip>
          </div>
          <pre className="text-gray-400 text-wrap break-words mb-4">
            {category.description}
          </pre>
          <Accordion
            header={({ isOpen }) => (
              <div className="flex items-center cursor-pointer text-secondary">
                <ChevronRight
                  className={`size-4 transition-transform duration-300 ${isOpen ? "transform rotate-90" : ""}`}
                />
                <span className="ml-1 text-sm">Indicados</span>
              </div>
            )}
          >
            <div className="pt-4 flex flex-wrap gap-2">
              {category.nominees.map((nominee) => (
                <div
                  key={nominee}
                  className="flex items-center gap-2 p-2 bg-secondary bg-opacity-15 rounded-md text-sm"
                >
                  <span>{nominee}</span>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      ))}
    </div>
  );
};
