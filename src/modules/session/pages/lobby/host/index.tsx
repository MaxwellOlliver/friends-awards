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
import { gameDataService } from "@/modules/session/services/game-data";
import { addToast, addToastWithError } from "@/lib/toast";
import { tryCatch } from "@/utils/error";
import { useLoading } from "@/hooks/useLoading";
import { PageModal } from "@/components/PageModal";
import { VoteForm } from "@/modules/session/components/vote-form";
import { useEffect, useState } from "react";
import { CustomSocketEventMap, socket } from "@/http/socket";
import { SocketEvents } from "@/modules/session/constants/socket-events";

export const Host = () => {
  const [mustVote, setMustVote] = useState(false);
  const { gameData, participants, session, registerGameAction } = useSession();
  const { loading, setLoadingState } = useLoading({
    startVoting: false,
    revealWinner: false,
  });

  useEffect(() => {
    function handleVotingStarted(
      data: CustomSocketEventMap[SocketEvents.VOTING_STARTED]
    ) {
      registerGameAction("START_VOTING", data.category.id);
      setMustVote(true);
    }

    socket.on(SocketEvents.VOTING_STARTED, handleVotingStarted);

    return () => {
      socket.off(SocketEvents.VOTING_STARTED, handleVotingStarted);
    };
  }, []);

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

  const handleStartVoting = async () => {
    setLoadingState("startVoting", true);
    const [error] = await tryCatch(gameDataService.startVoting(session!.id));

    if (error) {
      addToastWithError({
        title: "Erro ao iniciar votação",
        error,
      });
    }

    setLoadingState("startVoting", false);
  };

  return (
    <LayoutPage>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-full">
          <h1 className="text-xl ">
            Sessão <span className="text-secondary-500">#{session!.pin}</span>
          </h1>
          <h1 className="text-4xl font-bold mb-8 break-words">
            {session!.name}
          </h1>
          <div className="my-4 mb-16">
            <CategoryHistory />
          </div>

          <div className="flex flex-col gap-4 mt-8">
            {gameData?.state === GameDataState.VOTING && (
              <div className="flex items-center gap-2 mb-8">
                <Loader className="size-4" />
                <span>
                  Aguardando votos (
                  {gameData?.registeredVotes && gameData?.currentCategory
                    ? gameData.registeredVotes[gameData?.currentCategory].length
                    : 0}
                  /{participants.length})
                </span>
              </div>
            )}
            <footer className="flex gap-4 flex-wrap flex-col md:flex-row">
              {gameData?.state === GameDataState.VOTING && (
                <>
                  <Button
                    color="primary"
                    iconLeft={Vote}
                    onClick={() => setMustVote(true)}
                  >
                    Votar agora!
                  </Button>
                  <Button
                    color="secondary"
                    iconLeft={StopCircle}
                    // onClick={() => changeState("voting-closed")}
                  >
                    Encerrar votação
                  </Button>
                </>
              )}
              {gameData?.state === GameDataState.FINISHED && (
                <Button color="primary" iconLeft={Crown}>
                  Revelar vencedor
                </Button>
              )}
              {gameData?.state === GameDataState.WAITING && (
                <Button
                  color="primary"
                  iconLeft={Vote}
                  onClick={handleStartVoting}
                  isLoading={loading.startVoting}
                >
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
          <Tabs items={tabs} />
        </div>
      </div>
      <PageModal isOpen={mustVote} onClose={() => setMustVote(false)}>
        <VoteForm
          onVoteRegistered={() => {
            setMustVote(false);
            addToast({
              title: "Voto registrado",
              message: "Seu voto foi registrado com sucesso!",
              type: "success",
              icon: Vote,
            });
          }}
        />
      </PageModal>
    </LayoutPage>
  );
};
