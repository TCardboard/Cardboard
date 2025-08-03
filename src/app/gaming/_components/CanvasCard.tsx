"use client";

import { useDraggable } from "@dnd-kit/core";
import { api } from "@root/convex/_generated/api";
import { useMutation } from "convex/react";
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
  const [finalT, setFinalT] = useState({ x: 0, y: 0 });
  const margin = 1;

  const updateCard = useMutation(api.cards.updateCard);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  useEffect(() => {
    const delta = Math.sqrt(finalT.x ** 2 + finalT.y ** 2);
    if (delta > margin) {
      // Flip the card by updating the visible field on the server
      const updatedCard = { ...card, visible: !card.visible };
      updateCard({ card: updatedCard, cardId: card._id });
      setCard(updatedCard);
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
        return card.visible;
      }}
      className={cn(
        "absolute flex items-center justify-center transition",
        "h-[192px] w-[140px] rounded-lg shadow-md",
        isDragging
          ? "z-50 cursor-grab bg-blue-200 transition-none"
          : "bg-gray-200 transition-shadow duration-200"
      )}>
      <FlipCard
        flipped={!card.visible}
        setFlipped={(flipped) => {
          const updatedCard = { ...card, visible: !flipped };
          updateCard({
            card: { ...updatedCard, visible: !card.visible },
            cardId: card._id,
          });
          setCard(updatedCard);
        }}
        isDragging={isDragging}
        front={<p>Front Content</p>}
        back={<p>Back Content</p>}
        card={card}
        setCard={setCard}
      />
    </div>
  );
}
