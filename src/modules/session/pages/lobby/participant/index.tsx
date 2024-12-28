import { Loader } from "@/components/Loader";
import { LayoutPage } from "@/layout/components/LayoutPage";
import { useParams } from "@tanstack/react-router";
import { ParticipantsList } from "@/modules/session/components/participants-list";
import { useSession } from "@/modules/session/contexts/session-context";
import { TabsData } from "@/components/Tabs/types";
import { Medal, Users, Vote } from "lucide-react";
import { CategoriesList } from "@/modules/session/components/categories-list";
import { Tabs } from "@/components/Tabs";
import { PageModal } from "@/components/PageModal";
import { useState } from "react";
import { VoteForm } from "@/modules/session/components/vote-form";
import { addToast } from "@/lib/toast";
import { Button } from "@/components/Button";

export const Participant = () => {
  const { participants, gameData } = useSession();

  const [mustVote, setMustVote] = useState(false);

  const params = useParams({
    from: "/_auth/session/$sessionId/_lobby/participant",
  });

  const tabs: TabsData[] = [
    {
      key: "participants",
      title: `Participantes (${gameData?.connectedParticipants.length}/${participants.length})`,
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
            Sessão{" "}
            <span className="text-secondary-500">{params.sessionId}</span>
          </h1>
          <h1 className="text-4xl font-bold mb-8 break-words">
            Game of the year
          </h1>

          <h1 className="text-lg">Próxima categoria</h1>
          <h1 className="text-2xl font-bold">Jogador Revelação</h1>

          <div className="flex items-center gap-4 mt-12">
            <Loader className="size-4" />
            <span>Aguardando host iniciar votação...</span>
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
