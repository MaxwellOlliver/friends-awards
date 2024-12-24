import { ArrowRight, PlusCircle } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/Button";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex w-full justify-center items-center flex-col p-8">
        <h1 className="text-3xl font-semibold">The Friend Awards</h1>
        <h1 className="text-xl mb-8">2024</h1>
        <div className="flex gap-4 flex-wrap">
          <Button
            onClick={() =>
              navigate({
                to: "/create-session",
              })
            }
            iconLeft={PlusCircle}
          >
            Criar sessão
          </Button>
          <Button
            color="primary"
            iconLeft={ArrowRight}
            onClick={() =>
              navigate({
                to: "/enter-session",
              })
            }
          >
            Entrar em uma sessão
          </Button>
        </div>
      </div>
    </div>
  );
};
