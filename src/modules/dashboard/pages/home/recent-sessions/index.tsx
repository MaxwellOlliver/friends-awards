import { Plus, Search } from "lucide-react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Session } from "../../sessions/list-sessions/session";
import { Link } from "@tanstack/react-router";

export const RecentSessions = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-4">Minhas sessões em votação</h1>
      <header className="flex gap-4">
        <Input placeholder="Pesquisar sessões" iconLeft={Search} />
        <Button color="primary" iconLeft={Plus}>
          Nova sessão
        </Button>
      </header>
      <div className="w-full grid grid-cols-1 gap-4">
        {[
          "Game of the year",
          "Teste nome graaaa",
          "Dudu o mais gay",
          "Dudu o mais gay",
        ].map((_, index) => (
          <Session key={index} session={{ name: _ }} />
        ))}
      </div>
      <Link
        to="/dashboard/my-sessions"
        className="text-primary hover:underline text-sm w-fit self-end"
        resetScroll={false}
      >
        Ver todas as sessões
      </Link>
    </div>
  );
};
