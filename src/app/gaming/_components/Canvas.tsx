import { useDroppable } from "@dnd-kit/core";
import type { CanvasCardProps } from "./CanvasCard";
import CanvasCard from "./CanvasCard";

type CanvasProps = {
  cards: CanvasCardProps[];
};

export default function Canvas({ cards }: CanvasProps) {
  const { setNodeRef } = useDroppable({ id: "canvas" });

  return (
    <div
      ref={setNodeRef}
      className="flex h-[400px] w-full items-center justify-center overflow-hidden bg-gray-50"
    >
      {cards.map((card) => (
        <CanvasCard
          key={card.id}
          id={card.id}
          x={card.x}
          y={card.y}
          image={card.image}
        >
          {card.children}
        </CanvasCard>
      ))}
    </div>
  );
}
