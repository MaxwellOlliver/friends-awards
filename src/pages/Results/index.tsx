import { useSessionStore } from "@/store/session-store";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import Pride from "react-canvas-confetti/dist/presets/pride";
import { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Button } from "@/components/Button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const Results = () => {
  const { categories, winners } = useSessionStore();
  const [renderConfetti, setRenderConfetti] = useState(false);

  const navigate = useNavigate();

  const lastWinnerKey = Array.from(winners.keys()).pop();
  const lastWinner = lastWinnerKey ? winners.get(lastWinnerKey) : null;

  const category = categories[0].name;
  const winner = categories[0].nominees[0];

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={cn("flex flex-col items-center gap-4", {
          "animate-shake": !renderConfetti,
        })}
        style={{ animationDelay: "2500ms" }}
        onAnimationStart={(e) => {
          if (e.animationName === "shake") {
            setTimeout(() => setRenderConfetti(true), 3000);
          }
        }}
      >
        <span
          className="text-4xl opacity-0 animate-slide-down"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          categoria
        </span>
        <h1
          className="text-5xl font-bold opacity-0 animate-slide-down"
          style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}
        >
          {category}
        </h1>
        <span
          className="text-4xl opacity-0 animate-slide-down"
          style={{ animationDelay: "1800ms", animationFillMode: "forwards" }}
        >
          o vencedor é
        </span>
        <h1
          className={cn("text-6xl font-bold mt-8 text-primary opacity-0 ", {
            "opacity-1 animate-pulse": renderConfetti,
          })}
        >
          {winner}
        </h1>
        <Button
          color="ghost"
          icon={ArrowRight}
          className="mt-8 animate-fade-in opacity-0"
          style={{ animationDelay: "7500ms", animationFillMode: "forwards" }}
          onClick={() => navigate({ to: "/session" })}
        >
          Continuar
        </Button>
      </div>
      {renderConfetti && (
        <>
          <Realistic
            autorun={{ speed: 1, duration: 1 }}
            decorateOptions={(opt) => ({
              ...opt,
              colors: ["#FFD700", "#ff9100", "#ff7300"],
            })}
          />
          <Pride
            autorun={{ speed: 20 }}
            decorateOptions={(opt) => ({
              ...opt,
              colors: ["#FFD700", "#ff9100", "#ff7300"],
            })}
          />
        </>
      )}
    </div>
  );
};
