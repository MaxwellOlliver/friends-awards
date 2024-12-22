import { Check } from "lucide-react";
import { Loader } from "../../components/Loader";
import { useParams, useSearch } from "@tanstack/react-router";

export const VoteRegistered = () => {
  const { session } = useParams({
    strict: false,
  });
  const search: { hasVoted?: string } = useSearch({ strict: false });
  const hasNextCategory = true;

  console.log(search);

  return (
    <div className="flex flex-col items-center justify-center max-w-[900px] p-4">
      {search.hasVoted && (
        <>
          <Check className="size-10 mb-4 text-white" />
          <h1 className="text-4xl font-bold mb-4 text-center">
            Seu voto foi registrado!
          </h1>
        </>
      )}
      {hasNextCategory && (
        <div className="flex items-center gap-4 mt-12 flex-col">
          <Loader />
          <span>
            {search.hasVoted
              ? "Aguardando a próxima categoria"
              : "Aguardando primeira categoria"}
          </span>
        </div>
      )}
      <span className="mt-8 text-gray-500 absolute bottom-4">
        session: {session}
      </span>
    </div>
  );
};
