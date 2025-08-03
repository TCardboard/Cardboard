import { useDraggable } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { cn } from "@/libs/utils";
import type { CardType } from "@/utils/types";
import FlipCard from "./FlipCard";

export type CanvasCardProps = {
  id: string;
  card: CardType;
  setCard: (card: CardType) => void;
};

export default function CanvasCard({ id, card, setCard }: CanvasCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [finalT, setFinalT] = useState({ x: 0, y: 0 });
  const margin = 1;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  useEffect(() => {
    const delta = Math.sqrt(finalT.x ** 2 + finalT.y ** 2);
    if (delta > margin) {
      setFlipped((f) => !f);
    }
    console.log(delta);
    setFinalT({ x: 0, y: 0 });
  }, [isDragging]);

  useEffect(() => {
    // console.log(initT, finalT, transform);
    if (!transform) return;
    if (transform.y > 0.1 || transform.x > 0.1) {
      setFinalT(transform);
    }
  }, [transform]);

  const style = {
    left: card.x + (transform?.x ?? 0),
    top: card.y + (transform?.y ?? 0),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onMouseUp={() => {
        setFlipped((f) => !f);
      }}
      className={cn(
        "absolute flex items-center justify-center",
        "h-28 w-20 rounded-lg shadow-md",
        isDragging
          ? "z-50 cursor-grab bg-blue-200 transition-none"
          : "bg-gray-200 transition-shadow duration-200"
      )}>
      <FlipCard
        flipped={flipped}
        setFlipped={setFlipped}
        isDragging={isDragging}
        front={<p>Front Content</p>}
        back={<p>Back Content</p>}
        card={card}
        setCard={setCard}
      />
    </div>
  );
}
