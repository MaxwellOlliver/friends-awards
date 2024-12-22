import { useSessionStore } from "@/store/session-store";
import { cn } from "@/utils/cn";
import { ChevronLeft } from "lucide-react";
import { useRef } from "react";

export const CategoryHistory = () => {
  const { currentCategory, categories } = useSessionStore();
  const hasFinishedFirstAnimation = useRef(false);

  const currentCategoryIndex = categories.findIndex(
    (category) => category.id === currentCategory
  );
  const firstIndex = Math.max(0, currentCategoryIndex - 1);

  return (
    <div className="flex flex-col items-end relative gap-4 h-fit">
      <div
        className="w-[2px] absolute top-0 left-[5px] animate-h-grow bg-[#444444]"
        style={{ animationDuration: "1000ms", animationFillMode: "forwards" }}
      ></div>
      {categories
        .slice(
          firstIndex,
          firstIndex === 0
            ? 3
            : Math.min(categories.length, currentCategoryIndex + 2)
        )
        .map((category, index) => {
          return (
            <div
              key={category.id}
              className={cn(
                "flex items-center w-full z-20 animate-slide-left opacity-0",
                {
                  "text-[#555555] [&_div]:bg-[#555555]":
                    currentCategory !== category.id,
                  "text-primary [&_div]:bg-primary":
                    category.id === currentCategory,
                }
              )}
              style={{
                animationDelay: !hasFinishedFirstAnimation.current
                  ? `${200 + index * 200}ms`
                  : undefined,
                animationFillMode: "forwards",
              }}
              onAnimationEnd={(e) => {
                if (
                  index === 2 &&
                  !hasFinishedFirstAnimation.current &&
                  e.animationName === "slide-left"
                ) {
                  hasFinishedFirstAnimation.current = true;
                }
              }}
            >
              <div
                className={cn(
                  "size-3 bg-white rounded-full flex items-center justify-center"
                )}
              ></div>
              <span className="text-sm ml-4">{category.name}</span>
              {currentCategory === category.id && (
                <ChevronLeft className="size-4" />
              )}
            </div>
          );
        })}
    </div>
  );
};
