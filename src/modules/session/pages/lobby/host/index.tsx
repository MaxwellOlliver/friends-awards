import { Button } from "@/components/Button";
import { CategoryHistory } from "./category-history";
import {
  Crown,
  Logs,
  Medal,
  StopCircle,
  Trash2,
  Users,
  Vote,
} from "lucide-react";
import { Loader } from "@/components/Loader";
import { LogsPanel } from "./logs-panel";
import { Tabs } from "@/components/Tabs";
import { TabsData } from "@/components/Tabs/types";
import { LayoutPage } from "@/layout/components/LayoutPage";
import { ParticipantsList } from "@/modules/session/components/participants-list";
import { useSession } from "@/modules/session/contexts/session-context";
import { CategoriesList } from "@/modules/session/components/categories-list";
import { GameDataState } from "@/modules/session/types/session";

export const Host = () => {
  const { gameData, participants, session } = useSession();

  const tabs: TabsData[] = [
    {
      key: "logs",
      title: "Logs",
      icon: Logs,
      content: <LogsPanel />,
      forceRender: true,
    },
    {
      key: "participants",
      title: `Participantes (${gameData?.connectedParticipants?.length ?? 0}/${participants.length})`,
      icon: Users,
      content: <ParticipantsList />,
      forceRender: true,
    },
    {
      key: "categories",
      title: "Categorias",
      icon: Medal,
      content: <CategoriesList />,
      forceRender: true,
    },
  ];

  return (
    <LayoutPage>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-full">
          <h1 className="text-xl ">
            Sessão <span className="text-secondary-500">#{session!.pin}</span>
          </h1>
          <h1 className="text-4xl font-bold mb-8 break-words">
            Game of the year
          </h1>
          <div className="my-4 mb-16">
            <CategoryHistory />
          </div>

          <div className="flex flex-col gap-4 mt-8">
            {gameData?.state === GameDataState.VOTING && (
              <div className="flex items-center gap-2 mb-8">
                <Loader className="size-4" />
                <span>Aguardando votos (0/4)</span>
              </div>
            )}
            <footer className="flex gap-4">
              {gameData?.state === GameDataState.VOTING && (
                <Button
                  color="primary"
                  iconLeft={StopCircle}
                  // onClick={() => changeState("voting-closed")}
                >
                  Encerrar votação
                </Button>
              )}
              {gameData?.state === GameDataState.FINISHED && (
                <Button color="primary" iconLeft={Crown}>
                  Revelar vencedor
                </Button>
              )}
              {gameData?.state === GameDataState.WAITING && (
                <Button color="primary" iconLeft={Vote}>
                  Iniciar votação
                </Button>
              )}
              <Button
                color="error"
                variant="outline"
                iconLeft={Trash2}
                disabled
              >
                Fechar sessão
              </Button>
            </footer>
          </div>
        </div>
        <div className="h-full flex">
          <Tabs items={tabs} defaultActiveTabKey="categories" />
        </div>
      </div>
    </LayoutPage>
  );
};
