"use client";

import {
  DndContext,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";
import Canvas from "./_components/Canvas";
import type { CanvasCardProps } from "./_components/CanvasCard";
import Hand from "./_components/Hand";
import HandCard from "./_components/HandCard";

const initialCards: CanvasCardProps[] = [
  { id: "card-1", x: 50, y: 50 },
  { id: "card-2", x: 180, y: 80 },
  { id: "card-3", x: 320, y: 120 },
];

const initialHand: string[] = [];

export default function GamingPage() {
  const [hand, setHand] = useState<string[]>(initialHand);
  const [canvasCards, setCanvasCards] =
    useState<CanvasCardProps[]>(initialCards);

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

    const [activeId, overId] = [String(active.id), String(over.id)];

    if (overId === "hand") {
      setHand((prev) => (prev.includes(activeId) ? prev : [...prev, activeId]));
      setCanvasCards((prev) => prev.filter((c) => c.id !== activeId));
    } else if (overId === "canvas") {
      const mouseX = active.rect?.current?.translated?.left ?? 200;
      const mouseY = active.rect?.current?.translated?.top ?? 200;
      const card: CanvasCardProps = {
        id: activeId,
        x: mouseX,
        y: mouseY,
      };
      setCanvasCards((prev) => [
        ...prev.filter((c) => c.id !== activeId),
        card,
      ]);
      setHand((prev) => prev.filter((cid) => cid !== activeId));
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      {/* Canvas */}
      <Canvas cards={canvasCards} />

      {/* Hand */}
      <Hand id="hand">
        {hand.map((id) => (
          <HandCard key={id} id={id} />
        ))}
      </Hand>
    </DndContext>
  );
}
