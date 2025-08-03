import { api } from "@root/convex/_generated/api";
import { useQuery } from "convex/react";
import type { CardType } from "@/utils/types";
import Canvas from "../gaming/_components/Canvas";
import Hand from "../gaming/_components/Hand";
import { PlayerWindow } from "./PlayerWindow";

type GameRoomProps = {
  canvasCards: CardType[];
  setCanvasCards: (update: (prev: CardType[]) => CardType[]) => void;
  hand: CardType[];
  setHand: (update: (prev: CardType[]) => CardType[]) => void;
};

export const GameRoom = ({
  canvasCards,
  setCanvasCards,
  hand,
  setHand,
}: GameRoomProps) => {
  const users = useQuery(api.users.getAllUsers) ?? [];
  return (
    <>
      <Canvas cards={canvasCards} setCards={setCanvasCards} />
      {/* top */}
      <PlayerWindow
        className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2"
        user={users[0]}
      />
      {/* left */}
      <PlayerWindow
        className="-translate-x-1/4 -translate-y-1/2 absolute top-1/2 left-0"
        user={users[1]}
      />
      {/* right */}
      <PlayerWindow
        className="-translate-y-1/2 absolute top-1/2 right-0 translate-x-1/4"
        user={users[2]}
      />
      <Hand hand={hand} setHand={setHand} id={"hand"} />
    </>
  );
};
