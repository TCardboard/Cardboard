"use client";

import { useRef, useState } from "react";
import type { CardType } from "@/utils/types";

interface CardProps {
  isDragging: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
  card: CardType;
  setCard: (card: CardType) => void;
}

export default function FlipCard({
  isDragging,
  front,
  back,
  card,
  setCard,
}: CardProps) {
  const [flipped, setFlipped] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      onClick={() => {
        setCard({ ...card, visible: !card.visible });
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((prev) => !prev);
        }
      }}
      className="perspective absolute h-48 w-35 cursor-grab bg-transparent p-0 active:cursor-grabbing"
    >
      <div
        className={`preserve-3d relative h-full w-full rounded-xl transition-transform duration-700 ${
          flipped ? "rotate-y-180" : ""
        } ${isDragging ? "shadow-[0_8px_30px_rgba(0,0,0,0.4)]" : "shadow-2xl"}`}
      >
        {/* Front Face */}
        <div className="backface-hidden absolute flex h-full w-full items-center justify-center rounded-xl bg-blue-500 text-white">
          {front}
        </div>

        {/* Back Face */}
        <div className="backface-hidden absolute flex h-full w-full rotate-y-180 transform items-center justify-center rounded-xl bg-red-500 text-white shadow-inner">
          {back}
        </div>
      </div>
    </div>
  );
}
