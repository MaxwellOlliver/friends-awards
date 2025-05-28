import { Loader } from "@/components/Loader";
import { LayoutPage } from "@/layout/components/LayoutPage";
import { ParticipantsList } from "@/modules/session/components/participants-list";
import { useSession } from "@/modules/session/contexts/session-context";
import { TabsData } from "@/components/Tabs/types";
import { Medal, Users, Vote } from "lucide-react";
import { CategoriesList } from "@/modules/session/components/categories-list";
import { Tabs } from "@/components/Tabs";
import { PageModal } from "@/components/PageModal";
import { useEffect, useState } from "react";
import { VoteForm } from "@/modules/session/components/vote-form";
import { addToast } from "@/lib/toast";
import { Button } from "@/components/Button";
import { CustomSocketEventMap, socket } from "@/http/socket";
import { SocketEvents } from "@/modules/session/constants/socket-events";

export const Participant = () => {
  const { participants, gameData, session, registerGameAction } = useSession();

  const [mustVote, setMustVote] = useState(false);

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
      key: "participants",
      title: `Participantes (${gameData?.connectedParticipants?.length}/${participants.length})`,
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
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col p-4 w-full">
          <h1 className="text-xl ">
            Sessão <span className="text-secondary-500">#{session!.pin}</span>
          </h1>
          <h1 className="text-4xl font-bold mb-8 break-words">
            {session!.name}
          </h1>

          <h1 className="text-lg">Próxima categoria</h1>
          <h1 className="text-2xl font-bold">Jogador Revelação</h1>

          <div className="flex items-center gap-4 mt-12">
            <Loader className="size-4" />
            <span>Aguardando próxima categoria...</span>
          </div>

          <div className="mt-12">
            <Button onClick={() => setMustVote(true)} iconLeft={Vote}>
              Votar agora!
            </Button>
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
