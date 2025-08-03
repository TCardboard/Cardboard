import { cn } from "@/libs/utils";
import type { CardType } from "@/utils/types";
import { useDraggable } from "@dnd-kit/core";
import FlipCard from "./FlipCard";

type HandCardProps = {
  id: string;
  card: CardType;
};

export default function HandCard({ id, card }: HandCardProps) {
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
      )}
    >
      <FlipCard
        flipped={true}
        setFlipped={() => {}}
        isDragging={isDragging}
        card={card}
      />
    </div>
  );
}
