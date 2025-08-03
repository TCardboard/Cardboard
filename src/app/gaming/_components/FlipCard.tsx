"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { getCardUrl } from "@/libs/cards";
import type { CardType } from "@/utils/types";

interface CardProps {
  isDragging: boolean;
  front: React.ReactNode;
  back: React.ReactNode;
  card: CardType;
  flipped: boolean;
  setFlipped: (flipped: boolean) => void;
  setCard: (card: CardType) => void;
}

export default function FlipCard({
  isDragging,
  card,
  setCard,
  flipped = false,
  setFlipped,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const front = (
    <Image
      src={getCardUrl(card.type)}
      fill
      alt={card.type}
      className="rounded-xl bg-transparent"
    ></Image>
  );
  const back = (
    <Image
      src="/Cards/Backs/Red Back.webp"
      fill
      alt={card.type}
      className="rounded-xl bg-transparent"
    ></Image>
  );
  return (
    <div
      ref={cardRef}
      onClick={() => {
        setFlipped(!flipped);
      }}
      className="perspective absolute h-48 w-35 cursor-grab bg-transparent p-0 active:cursor-grabbing"
    >
      <div
        className={`preserve-3d relative h-full w-full rounded-xl transition-transform duration-700 ${
          flipped ? "rotate-y-180" : ""
        } ${isDragging ? "shadow-[0_8px_30px_rgba(0,0,0,0.4)]" : "shadow-2xl"}`}
      >
        {/* Front Face */}
        <div className="backface-hidden absolute flex h-full w-full items-center justify-center rounded-xl text-white">
          {front}
        </div>

        {/* Back Face */}
        <div className="backface-hidden absolute flex h-full w-full rotate-y-180 transform items-center justify-center rounded-xl text-white shadow-inner">
          {back}
        </div>
      </div>
    </div>
  );
}
