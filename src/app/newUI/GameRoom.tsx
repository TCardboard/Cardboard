"use client";

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
};

export const GameRoom = ({
  canvasCards,
  setCanvasCards,
  hand,
}: GameRoomProps) => {
  // const users = useQuery(api.users.getAllUsers) ?? [];
  const cards = useQuery(api.cards.getAllCards) ?? [];
  const kevinCards = cards.filter((card) => card.x < 300);
  const ashtonCards = cards.filter((card) => card.x > 1200);
  const nateCards = cards.filter((card) => card.x >= 300 && card.x <= 1200 && card.y < 150);

  return (
    <>
      <Canvas cards={canvasCards} setCards={setCanvasCards} />
      {/* top */}
      <PlayerWindow
        className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2"
        user="Nate"
        length={nateCards.length}
      />
      {/* left */}
      <PlayerWindow
        className="-translate-x-1/4 -translate-y-1/2 absolute top-1/2 left-0"
        user="Kevin"
        length={kevinCards.length}
      />
      {/* right */}
      <PlayerWindow
        className="-translate-y-1/2 absolute top-1/2 right-0 translate-x-1/4"
        user="Ashton"
        length={ashtonCards.length}
      />
      {/* <Hand hand={hand} id={"hand"} /> */}
    </>
  );
};
