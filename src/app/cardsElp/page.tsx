/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import Card from "@/components/cards/Card";
import Hand from "@/components/cards/Hand";
import { api } from "../../../convex/_generated/api";
import type { Doc } from "../../../convex/_generated/dataModel";
import DroppableCanvas from "./_components/DroppableCanvas";

const initialCards = [
  { id: "card-1", x: 50, y: 50, children: "🂡" },
  { id: "card-2", x: 180, y: 80, children: "🂢" },
  { id: "card-3", x: 320, y: 120, children: "🂣" },
];

type CardType = Doc<"cards">;

export default function CardsPage() {
  const cards = useQuery(api.cards.get) || ([] as CardType[]);

  const [hand, setHand] = useState<string[]>([]);
  const [canvasCards, setCanvasCards] = useState<CardType[]>([]);

  useEffect(() => {
    if (!cards) return;

    console.log(cards);
    setCanvasCards(cards);
  }, [cards]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (overId === "hand") {
      setHand((prev) => [...prev, activeId]);
      setCanvasCards((prev) => prev.filter((c) => c._id !== activeId));
    } else if (overId === "canvas") {
      setCanvasCards((prev) => {
        const mouseX = active.rect?.current?.translated?.left ?? 200;
        const mouseY = active.rect?.current?.translated?.top ?? 200;

        // Find the original card
        const original = prev.find((c) => c._id === activeId);
        if (!original) return prev;

        const updatedCard: CardType = {
          ...original,
          x: mouseX,
          y: mouseY,
        };

        return [...prev.filter((c) => c._id !== activeId), updatedCard];
      });
      setHand((prev) => prev.filter((cid) => cid !== activeId));
    }
  }

  function handleCardMove(id: string, x: number, y: number) {
    setCanvasCards((prev) =>
      prev.map((card) => (card._id === id ? { ...card, x, y } : card))
    );
  }

  function handleCardDrop(id: string) {
    setHand((prev) => prev.filter((cid) => cid !== id));
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-1 flex-col items-center">
        <div className="mb-4 font-bold">Canvas</div>

        <DroppableCanvas
          cards={canvasCards}
          onCardMove={handleCardMove}
          onCardDrop={handleCardDrop}
        />
      </div>

      <div className="flex flex-col gap-4">
        <Hand id="hand">
          {hand.map((id) => (
            <Card key={id} id={id} style={{ position: "static" }}>
              {id}
            </Card>
          ))}
        </Hand>
      </div>
    </DndContext>
  );
}
