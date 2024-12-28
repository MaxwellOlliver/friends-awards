import { useEffect, useState } from "react";
import { SessionContext } from "./context";
import { GameData, Session, SessionState } from "../../types/session";
import { tryCatch } from "@/utils/error";
import { sessionService } from "../../services/session";
import { addToastWithError } from "@/lib/toast";
import { useNavigate, useParams } from "@tanstack/react-router";
import { SocketUser } from ".";
import { Loader } from "@/components/Loader";
import { UpdateGameDataFn } from "./types";
import { gameDataService } from "../../services/game-data";
import { Category } from "@/types/categories";
import { socket } from "@/lib/socket";
import { SocketEvents } from "../../constants/socket-events";
import { io } from "socket.io-client";

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSocketReady, setIsSocketReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [participants, setParticipants] = useState<SocketUser[]>([
    {
      id: "5455a36e-1beb-4cd3-985e-5cb7ea898e77",
      name: "Max",
      isHost: true,
    },
    {
      id: "5455a36e-1beb-4cd3-985e-5cb7ea898e78",
      name: "João",
      isHost: false,
    },
    {
      id: "5455a36e-1beb-4cd3-985e-5cb7ea898e79",
      name: "Maria",
      isHost: false,
    },
    {
      id: "5455a36e-1beb-4cd3-985e-5cb7ea898e67",
      name: "Carlos",
      isHost: false,
    },
  ]);
  const [gameData, setGameData] = useState<GameData | null>(null);

  const params = useParams({
    from: "/_auth/session/$sessionId/_lobby",
  });
  const navigate = useNavigate();

  const fetchSessionData = async () => {
    const session = await sessionService.getSession(params.sessionId);

    if (![SessionState.CREATED, SessionState.OPENED].includes(session.state)) {
      navigate({
        to: "/dashboard/home",
      });
      throw new Error("Sessão não está mais disponível");
    }

    const gameData = await sessionService.getSessionGameData(params.sessionId);
    const categories = await sessionService.getCategories(params.sessionId);
    const participants = await sessionService.getParticipants(params.sessionId);

    return { session, gameData, categories, participants };
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

    const { categories, gameData, session, participants } = data;

    setSession(session);
    setGameData(gameData);
    setCategories(categories);
    setParticipants(participants);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

    socket.auth = { token };

    socket.connect();

    socket.on(SocketEvents.CONNECT, () => {
      setIsSocketReady(true);
    });

    socket.on(SocketEvents.DISCONNECT, () => {
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

        await gameDataService.startVoting(session.id, categoryId);
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
      {isLoading && !isSocketReady ? (
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
