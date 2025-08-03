"use client";

import XpWindowControls from "@/components/controlbutton";
import { useLocalPlayer } from "@/libs/utils/hooks";
import type { CardType } from "@/utils/types";
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
import { Clock } from "lucide-react";
import { ChatRoom } from "./ChatRoom";
import { EnterGame } from "./EnterGame";
import { GameRoom } from "./GameRoom";
import { ShuffleButton } from "./ShuffleButton";
import { WindowContainer, WindowContent, WindowHeader } from "./Window";

export default function Board() {
  const cards = useQuery(api.cards.getAllCards) ?? [];
  const moveCardToHand = useMutation(api.cards.moveCardToHand);

  const updateAllCards = useMutation(api.cards.updateAllCards);
  const { player, setPlayer } = useLocalPlayer();

  const hand = cards.filter((c) => c.playerId === player?._id);
  const canvasCards = cards.filter((c) => c.playerId !== player?._id);

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

    const [activeId, overId] = [active.id, String(over.id)];

    console.log("activeId", activeId, "overId", overId);
    console.log("active", active);

    if (overId === "hand") {
      if (!player) return;
      console.log("Dragging to hand");
      moveCardToHand({ cardId: activeId as Id<"cards">, playerId: player._id });
    } else if (overId === "canvas") {
      const mouseX = active.rect?.current?.translated?.left ?? 0;
      const mouseY = active.rect?.current?.translated?.top ?? 0;

      const card = cards.find((c) => c._id === activeId);
      if (card) {
        card.playerId = null;
        card.x = mouseX - 128;
        card.y = mouseY - 128;
      }
      if (!card) return;
      setCanvasCards((prev) => [
        ...prev.filter((c) => c._id !== activeId),
        card,
      ]);
      setHand((prev) => prev.filter((c) => c._id !== activeId));
    }
  }

  const handleLogout = () => {
    console.log("User logged out");
    setPlayer(null);
  };

  return (
    <>
      <WindowContainer className="size-full">
        <WindowHeader className="px-2">
          Card Board{" "}
          {player && (
            <span className="flex items-center gap-2">
              <ShuffleButton />
              <XpWindowControls controls={["logout"]} onLogout={handleLogout} />
            </span>
          )}
        </WindowHeader>
        <WindowContent>
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            {player ? (
              <GameRoom
                hand={hand}
                canvasCards={canvasCards}
                setCanvasCards={setCanvasCards}
              />
            ) : (
              <EnterGame />
            )}
          </DndContext>
        </WindowContent>
      </WindowContainer>
      {/* <Clock /> */}
      <ChatRoom />
    </>
  );
}
