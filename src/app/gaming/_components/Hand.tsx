"use client";

import { useDroppable } from "@dnd-kit/core";
import type React from "react";
import { cn } from "@/components/libs/utils";
import type { CardType } from "@/utils/types";
import HandCard from "./HandCard";

export type HandProps = {
  id: string;
  hand: CardType[];
  setHand: React.Dispatch<React.SetStateAction<CardType[]>>;
};

export default function Hand({ id, hand, setHand }: HandProps) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex min-h-[140px] flex-row items-center justify-center gap-2 rounded-lg border-2 p-2",
        isOver
          ? "border-yellow-500 bg-yellow-200"
          : "border-gray-300 bg-gray-100"
      )}
    >
      <div className="font-bold">Hand</div>
      {hand.map((card) => (
        <HandCard
          key={card._id}
          id={card._id}
          card={card}
          setCard={(updatedCard: CardType) =>
            setHand((prev: CardType[]) =>
              prev.map((c) => (c._id === card._id ? updatedCard : c))
            )
          }
        />
      ))}
    </div>
  );
}
