import { Tooltip } from "@/components/Tooltip";
import { Lock, Star, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface SessionProps {
  session: { name: string };
}

export const Session = ({ session }: SessionProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  const handleCopy = () => {
    navigator.clipboard.writeText("123456");
    setIsCopied(true);
  };

  const handleMouseOut = () => {
    timeoutRef.current = setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setIsCopied(false);
  };

  return (
    <div className="w-full bg-background-light p-4 px-6 rounded-md flex justify-between cursor-pointer hover:bg-[#41414140] transition-colors gap-4">
      <div className="flex flex-col gap-4 w-full min-w-0 justify-between">
        <Tooltip text={session.name}>
          <h1 className="text-xl font-bold break-words truncate">
            {session.name}
          </h1>
        </Tooltip>
        <div className="flex gap-4 items-center">
          <span className="text-[#fff] text-opacity-70 flex items-center gap-2">
            <Star className="size-4 text-secondary" aria-label="Host" />
            <span>Noobmaster69</span>
          </span>
          <span className="text-[#fff] text-opacity-70 flex items-center gap-2">
            <Users className="size-4 text-secondary" aria-label="Host" />
            <span>6</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-end justify-between w-fullmin-w-0">
        <span className="text-[#fff] text-opacity-70 flex items-center gap-2">
          <Lock className="size-4 text-primary" aria-label="Código da sessão" />
          <Tooltip text={isCopied ? "Copiado!" : "Clique para copiar"}>
            <button
              aria-label="Código da sessão"
              className="blur-sm hover:blur-0 hover:underline"
              onClick={handleCopy}
              onMouseOut={handleMouseOut}
              onMouseEnter={handleMouseEnter}
            >
              123456
            </button>
          </Tooltip>
        </span>
        <span className="uppercase text-[#fff] text-opacity-70 text-nowrap text-sm">
          em votação
        </span>
      </div>
    </div>
  );
};
