"use client";

import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/components/libs/utils";
import type { CardType } from "@/utils/types";
import HandCard from "./HandCard";

export type HandProps = {
  id: string;
  hand: CardType[];
  setHand: (update: (prev: CardType[]) => CardType[]) => void;
};

export default function Hand({ id, hand, setHand }: HandProps) {
  const { isOver, setNodeRef } = useDroppable({ id });

  console.log(hand);

  return (
    <div className="-translate-x-1/2 absolute bottom-0 left-1/2 w-full px-64">
      <div
        ref={setNodeRef}
        className={cn(
          "flex min-h-[140px] w-full flex-row items-center justify-center gap-2 rounded-lg border-2 border-b-0 p-2",
          isOver && "border-yellow-500 bg-yellow-200"
        )}>
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
    </div>
  );
}
