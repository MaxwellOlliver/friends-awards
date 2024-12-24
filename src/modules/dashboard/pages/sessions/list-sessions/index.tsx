import { Input } from "@/components/Input";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/Button";
import { Session } from "./session";

export const ListSessions = () => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="text-3xl font-bold mb-4">Minhas sessões</h1>
      <header className="flex gap-4">
        <Input placeholder="Pesquisar sessões" iconLeft={Search} />
        <Button color="primary" iconLeft={Plus}>
          Nova sessão
        </Button>
      </header>
      <div className="w-full grid grid-cols-1 gap-4">
        {[
          "Game of the year",
          "Teste nome graaaaaaaaaaandeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "Dudu o mais gay",
          "Dudu o mais gay",
          "Dudu o mais gay",
          "Dudu o mais gay",
        ].map((_, index) => (
          <Session key={index} session={{ name: _ }} />
        ))}
      </div>
    </div>
  );
};
