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
import { useEffect } from "react";
import { ChatRoom } from "./ChatRoom";
import { EnterGame } from "./EnterGame";
import { GameRoom } from "./GameRoom";
import { WindowContainer, WindowContent, WindowHeader } from "./Window";

export default function Board() {
  const cards = useQuery(api.cards.getAllCards) ?? [];
  const updateAllCards = useMutation(api.cards.updateAllCards);
  const { player, setPlayer } = useLocalPlayer();

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

  const handleLogout = () => {
    console.log("User logged out");
    setPlayer(null);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <WindowContainer className="size-full">
        <WindowHeader>Card Board <XpWindowControls controls={["logout"]} onLogout={handleLogout} /></WindowHeader>
        <WindowContent>
          {player ? (
            <GameRoom
              hand={hand}
              setHand={setHand}
              canvasCards={canvasCards}
              setCanvasCards={setCanvasCards}
            />
          ) : (
            <EnterGame />
          )}
        </WindowContent>
      </WindowContainer>
      <Clock />
      <ChatRoom />
    </DndContext>
  );
}
