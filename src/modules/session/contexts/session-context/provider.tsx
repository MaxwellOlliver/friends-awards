import { useEffect, useState } from "react";
import { SessionContext } from "./context";
import {
  Category,
  GameData,
  GameDataState,
  Session,
  SessionState,
} from "../../types/session";
import { tryCatch } from "@/utils/error";
import { sessionService } from "../../services/session";
import { addToastWithError } from "@/lib/toast";
import { useMatch, useNavigate, useParams } from "@tanstack/react-router";
import { Loader } from "@/components/Loader";
import { Participant, UpdateGameDataFn } from "./types";
import { gameDataService } from "../../services/game-data";
import { CustomSocketEventMap, socket } from "@/http/socket";
import { SocketEvents } from "../../constants/socket-events";
import { useAuthStore } from "@/store/auth-store";
import { useLogStore } from "@/store/log-store";

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSocketReady, setIsSocketReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [gameData, setGameData] = useState<GameData>({
    state: GameDataState.WAITING,
  });
  const _addLog = useLogStore((state) => state.addLog);

  const params = useParams({
    from: "/_auth/session/$sessionId/_lobby",
  });
  const navigate = useNavigate();
  const match = useMatch({
    from: "/_auth/session/$sessionId/_lobby/participant",
    shouldThrow: false,
  });
  const user = useAuthStore((state) => state.user);

  const addLog = (message: string) => {
    const isHost = session?.hostId === user?.id;

    if (!isHost) return;

    _addLog(message);
  };

  const fetchSessionData = async () => {
    const { session, categories, pin } = await sessionService.getSession(
      params.sessionId
    );

    if (
      [SessionState.CANCELLED, SessionState.FINISHED].includes(session.state)
    ) {
      navigate({
        to: "/dashboard/home",
      });
      throw new Error("Sessão não está mais disponível");
    }

    if (session.hostId === user?.id && match) {
      navigate({
        to: "/session/$sessionId/host",
        params: { sessionId: session.id },
      });
      return;
    }

    //const gameData = await sessionService.getSessionGameData(params.sessionId);
    const { participants } = await sessionService.getParticipants(
      params.sessionId
    );

    return {
      session: {
        ...session,
        pin,
      },
      gameData: {
        state: GameDataState.WAITING,
      },
      categories,
      participants,
    };
  };

  const fetchSession = async () => {
    setIsLoading(true);
    const [error, data] = await tryCatch(fetchSessionData());

    if (error) {
      addToastWithError({
        title: "Erro ao buscar dados da sessão",
        error: error,
      });
      return;
    }

    if (data) {
      socket.emit(SocketEvents.JOIN_SESSION, { sessionId: params.sessionId });

      const { categories, gameData, session, participants } = data;

      setSession(session);
      setGameData(gameData);
      setCategories(categories);
      setParticipants(participants);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isSocketReady) return;

    fetchSession();
  }, [isSocketReady]);

  useEffect(() => {
    if (!isSocketReady) return;

    function handleParticipantConnect(
      data: CustomSocketEventMap[SocketEvents.CONNECTED_USERS]
    ) {
      setGameData({
        ...gameData,
        connectedParticipants: data.participants,
      });

      const socketUser = participants.find(
        (participant) => participant.id === data.userId
      );

      if (data.action === "disconnect") {
        addLog(`${socketUser?.username} está offline`);
      } else {
        addLog(`${socketUser?.username} está online`);
      }
    }

    function handleNewParticipant(
      data: CustomSocketEventMap[SocketEvents.NEW_PARTICIPANT]
    ) {
      setParticipants([...participants, data.participant]);
      addLog(`${data.participant.username} entrou na sessão`);
    }

    function handleSessionStateChanged(
      data: CustomSocketEventMap[SocketEvents.SESSION_STATE_CHANGED]
    ) {
      setGameData((p) => ({
        ...p,
        state: data.state,
      }));
      addLog(`Estado da sessão alterado para ${data.state}`);
    }

    function handleVoteSubmitted(
      data: CustomSocketEventMap[SocketEvents.VOTE_SUBMITTED]
    ) {
      const participant = participants.find(
        (participant) => participant.id === data.participantId
      );

      addLog(`${participant?.username} votou!`);

      setGameData((prev) => {
        let registeredVotes = prev.registeredVotes;

        const vote = {
          nomineeId: data.nominee.id,
          participantId: data.participantId,
        };

        if (!registeredVotes) {
          registeredVotes = {};
        }

        if (!registeredVotes[data.category.id]) {
          registeredVotes[data.category.id] = [];
        }

        registeredVotes[data.category.id].push(vote);

        return {
          ...prev,
          registeredVotes,
        };
      });
    }

    socket.on(SocketEvents.CONNECTED_USERS, handleParticipantConnect);
    socket.on(SocketEvents.NEW_PARTICIPANT, handleNewParticipant);
    socket.on(SocketEvents.SESSION_STATE_CHANGED, handleSessionStateChanged);
    socket.on(SocketEvents.VOTE_SUBMITTED, handleVoteSubmitted);

    return () => {
      socket.off(SocketEvents.CONNECTED_USERS, handleParticipantConnect);
      socket.off(SocketEvents.NEW_PARTICIPANT, handleNewParticipant);
      socket.off(SocketEvents.SESSION_STATE_CHANGED, handleSessionStateChanged);
      socket.off(SocketEvents.VOTE_SUBMITTED, handleVoteSubmitted);
    };
  }, [isSocketReady, gameData, participants]);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("[web-socket] connected");
      setIsSocketReady(true);
    });

    socket.on("disconnect", () => {
      console.log("[web-socket] disconnected");
      setIsSocketReady(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const registerGameAction: UpdateGameDataFn = async (
    action,
    categoryId?: string
  ) => {
    if (!session) return;

    switch (action) {
      case "START_VOTING":
        if (!categoryId)
          throw new Error("CategoryId is required to start voting");

        setGameData((prev) => ({
          ...prev,
          //state: GameDataState.VOTING,
          currentCategory: categoryId,
        }));
        return;
      case "FINISH_VOTING":
        await gameDataService.finishVoting(session.id);

        return;
      default:
        throw new Error("Invalid action");
    }
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        gameData,
        categories,
        registerGameAction,
        participants,
      }}
    >
      {isLoading || !isSocketReady ? (
        <div className="flex items-center gap-4">
          <Loader />
          <span>Carregando dados da sessão...</span>
        </div>
      ) : (
        children
      )}
    </SessionContext.Provider>
  );
};
