"use client";

import {
  DndContext,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { api } from "@root/convex/_generated/api";
import type { Id } from "@root/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Button } from "@/components/ui/button";
import type { CardType, UserType } from "@/utils/types";
import Canvas from "./_components/Canvas";
import Hand from "./_components/Hand";

const initialCards: CardType[] = [
  {
    _id: "card-1" as Id<"cards">,
    x: 50,
    y: 50,
    _creationTime: 0,
    type: "",
    playerId: null,
    visible: false,
    z: 0,
  },
  {
    _id: "card-2" as Id<"cards">,
    x: 180,
    y: 80,
    _creationTime: 0,
    type: "",
    playerId: null,
    visible: false,
    z: 0,
  },
  {
    _id: "card-3" as Id<"cards">,
    x: 320,
    y: 120,
    _creationTime: 0,
    type: "",
    playerId: null,
    visible: false,
    z: 0,
  },
];

const dummyPlayer: UserType = {
  _id: "player-1" as Id<"users">,
  name: "Player 1",
  _creationTime: 0,
};

const initialHand: CardType[] = [];

export default function GamingPage() {
  const cards = useQuery(api.cards.getAllCards) ?? [];
  const updateAllCards = useMutation(api.cards.updateAllCards);

  // const { player } = useLocalPlayer();
  const player = dummyPlayer;

  const hand = cards.filter((c) => c.playerId === player?._id);
  const canvasCards = cards.filter((c) => c.playerId !== player?._id);

  console.log("hand", hand);

  const setHand = (update: (prev: CardType[]) => CardType[]) => {
    const newHand = update(hand);
    const newCards = [...newHand, ...canvasCards];
    const newStrippedCards = newCards.map(({ _creationTime, ...rest }) => rest);
    updateAllCards({ newCards: newStrippedCards });
  };

  const setCanvasCards = (update: (prev: CardType[]) => CardType[]) => {
    const newCanvas = update(canvasCards);
    const newCards = [...newCanvas, ...hand];
    const newStrippedCards = newCards.map(({ _creationTime, ...rest }) => rest);
    updateAllCards({ newCards: newStrippedCards });
  };

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 50,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const [activeId, overId] = [active.id as Id<"cards">, String(over.id)];

    if (overId === "hand") {
      if (!player) return;

      setHand((prev) => {
        const card = cards.find((c) => c._id === activeId);
        if (card) {
          if (prev.some((c) => c._id === card._id)) return prev;
          card.playerId = player._id;
          card.x = 0;
          card.y = 0;
          return [...prev, card];
        }
        return prev;
      });
      setCanvasCards((prev) => prev.filter((c) => c._id !== activeId));
    } else if (overId === "canvas") {
      const mouseX = active.rect?.current?.translated?.left ?? 200;
      const mouseY = active.rect?.current?.translated?.top ?? 200;

      const card = cards.find((c) => c._id === activeId);
      if (card) {
        card.playerId = null;
        card.x = mouseX;
        card.y = mouseY;
      }
      if (!card) return;
      setCanvasCards((prev) => [
        ...prev.filter((c) => c._id !== activeId),
        card,
      ]);
      setHand((prev) => prev.filter((c) => c._id !== activeId));
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Canvas cards={canvasCards} setCards={setCanvasCards} />

      {/* TODO: is there a way to add reordering of cards within a hand? */}
      <Hand id="hand" hand={hand} setHand={setHand} />
      <Button
        onClick={() => {
          setHand((prevs) => {
            let shuffledCards = [] as typeof prevs;
            prevs.forEach((c) => {
              const l = shuffledCards.length;
              const insertindex = Math.floor(Math.random() * l);
              shuffledCards = [
                ...shuffledCards.slice(0, insertindex - 1),
                c,
                ...shuffledCards.slice(insertindex - 1, l),
              ];
            });

            // * yeah
            return shuffledCards;
          });
        }}
      />
    </DndContext>
  );
}
