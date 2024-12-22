import { useSessionStore } from "@/store/session-store";
import { categories } from "../../constants/categories";
import { CategoryVoting } from "./category-voting";
import { useRouterState } from "@tanstack/react-router";

export const Vote = () => {
  const currentCategory = useSessionStore((state) => state.currentCategory);

  const state = useRouterState();

  console.log(state);

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex w-full justify-center items-center p-16">
        {categories.map(
          (category, index) =>
            currentCategory === category.id && (
              <CategoryVoting
                key={category.id}
                category={category}
                index={index}
              />
            )
        )}
      </div>
    </div>
  );
};
