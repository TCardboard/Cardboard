import { createContext, useContext } from "react";

export type CardTypeTemp = {
  id: string;
};

export type PlayerCtxType = {
  name: string;
  room: string;
  cards: CardTypeTemp[];
  setName: (name: string) => void;
  setRoom: (name: string) => void;
  setCards: (cards: CardTypeTemp[] | ((prev: CardTypeTemp[]) => CardTypeTemp[])) => void;
};

const PlayerContext = createContext<PlayerCtxType | undefined>(undefined);
export const PlayerProvider = PlayerContext.Provider;

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerContext Provider");
  }
  return context;
};
