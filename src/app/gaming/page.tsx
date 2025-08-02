"use client";

import {
  DndContext,
  type DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Id } from "@root/convex/_generated/dataModel";
import { useState } from "react";
import type { CardType } from "@/utils/types";
import Canvas from "./_components/Canvas";
import Hand from "./_components/Hand";
import HandCard from "./_components/HandCard";

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

const initialHand: string[] = [];

export default function GamingPage() {
  const [hand, setHand] = useState<string[]>(initialHand);
  const [canvasCards, setCanvasCards] = useState<CardType[]>(initialCards);

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
      setHand((prev) => (prev.includes(activeId) ? prev : [...prev, activeId]));
      setCanvasCards((prev) => prev.filter((c) => c._id !== activeId));
    } else if (overId === "canvas") {
      const mouseX = active.rect?.current?.translated?.left ?? 200;
      const mouseY = active.rect?.current?.translated?.top ?? 200;

      const card: CardType = {
        _id: activeId,
        x: mouseX,
        y: mouseY,
        _creationTime: 0,
        type: "", // TODO: WHAT THE FUCK
        playerId: null,
        visible: false,
        z: 0,
      };
      setCanvasCards((prev) => [
        ...prev.filter((c) => c._id !== activeId),
        card,
      ]);
      setHand((prev) => prev.filter((cid) => cid !== activeId));
    }
  }

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      {/* Canvas */}
      <Canvas cards={canvasCards} setCards={setCanvasCards} />

      {/* Hand */}
      <Hand id="hand">
        {hand.map((id) => (
          <HandCard key={id} id={id} />
        ))}
      </Hand>
    </DndContext>
  );
}
