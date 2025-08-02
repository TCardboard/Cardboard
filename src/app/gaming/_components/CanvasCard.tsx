import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/libs/utils";
import type { CardType } from "@/utils/types";
import FlipCard from "./FlipCard";

export type CanvasCardProps = {
  id: string;
  card: CardType;
  setCard: (card: CardType) => void;
};

export default function CanvasCard({ id, card, setCard }: CanvasCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

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
      className={cn(
        "absolute flex items-center justify-center",
        "h-28 w-20 rounded-lg shadow-md",
        isDragging
          ? "z-50 cursor-grab bg-blue-200 transition-none"
          : "bg-gray-200 transition-shadow duration-200"
      )}
    >
      <FlipCard
        isDragging={isDragging}
        front={<p>Front Content</p>}
        back={<p>Back Content</p>}
        card={card}
        setCard={setCard}
      />
    </div>
  );
}
