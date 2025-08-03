import { useDroppable } from "@dnd-kit/core";
import type { CardType } from "@/utils/types";
import CanvasCard from "./CanvasCard";

type CanvasProps = {
  cards: CardType[];
  setCards: (update: (prev: CardType[]) => CardType[]) => void;
};

export default function Canvas({ cards, setCards }: CanvasProps) {
  const { setNodeRef } = useDroppable({ id: "canvas" });

  return (
    <div
      ref={setNodeRef}
      className="flex h-[400px] w-full items-center justify-center overflow-hidden bg-gray-50">
      {cards.map((card) => (
        <CanvasCard
          key={card._id}
          id={card._id}
          card={card}
          setCard={(updatedCard) =>
            setCards((prev) =>
              prev.map((c) => (c._id === card._id ? updatedCard : c))
            )
          }
        />
      ))}
    </div>
  );
}
