import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/libs/utils";
import type { CardType } from "@/utils/types";
import FlipCard from "./FlipCard";

type HandCardProps = {
  id: string;
  card: CardType;
  setCard: (card: CardType) => void;
};

export default function HandCard({ id, card, setCard }: HandCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "flex items-center justify-center",
        "h-28 w-20 rounded-lg shadow-md",
        isDragging
          ? "z-50 cursor-grab bg-blue-200 transition-none"
          : "bg-gray-200 transition-shadow duration-200"
      )}>
      <FlipCard
        flipped={true}
        setFlipped={() => {}}
        isDragging={isDragging}
        front={<div className="size-24 bg-red-500"></div>}
        back={<div className="size-24 bg-blue-500"></div>}
        card={card}
        setCard={setCard}
      />
    </div>
  );
}
