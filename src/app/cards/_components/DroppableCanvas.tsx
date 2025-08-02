/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import { useDroppable } from "@dnd-kit/core";
import DraggableCard from "./DraggableCard";

export default function DroppableCanvas({ cards }: any) {
  const { setNodeRef } = useDroppable({ id: "canvas" });
  // Render cards at their x/y positions
  return (
    <div
      ref={setNodeRef}
      className="flex h-[400px] min-h-[400px] w-full overflow-hidden rounded-lg border bg-green-100"
    >
      {cards.map((card: any) => (
        <DraggableCard key={card.id} id={card.id} x={card.x} y={card.y}>
          {card.children}
        </DraggableCard>
      ))}
    </div>
  );
}
