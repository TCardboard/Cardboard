/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use client";

import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";
import Card from "@/components/cards/Card";
import Hand from "@/components/cards/Hand";
import DroppableCanvas from "./_components/DroppableCanvas";

type CanvasCard = {
  id: string;
  x: number;
  y: number;
  children?: React.ReactNode;
};

const initialCards = [
  { id: "card-1", x: 50, y: 50, children: "🂡" },
  { id: "card-2", x: 180, y: 80, children: "🂢" },
  { id: "card-3", x: 320, y: 120, children: "🂣" },
];

export default function CardsPage() {
  const [hand, setHand] = useState<string[]>([]);
  const [canvasCards, setCanvasCards] = useState<CanvasCard[]>(initialCards);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // Hand drop
    if (overId === "hand") {
      setHand((prev) => [...prev, activeId]);
      setCanvasCards((prev) => prev.filter((c) => c.id !== activeId));
    } else if (overId === "canvas") {
      setCanvasCards((prev) => {
        // Place at mouse position
        const mouseX = active.rect?.current?.translated?.left ?? 200;
        const mouseY = active.rect?.current?.translated?.top ?? 200;
        const card = { id: activeId, x: mouseX, y: mouseY, children: activeId };
        return [...prev.filter((c) => c.id !== activeId), card];
      });
      setHand((prev) => prev.filter((cid) => cid !== activeId));
    }
  }

  function handleCardMove(id: string, x: number, y: number) {
    setCanvasCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, x, y } : card))
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
