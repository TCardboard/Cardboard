"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getCardUrl } from "@/libs/cards";
import type { CardType } from "@/utils/types";

let globalZIndex = 50;

interface FlipCardProps {
  card: CardType;
  setCard: (card: CardType) => void;
}

// Nate: I made just enough hacks to get this to compile - Kevin when you convert this to DND-Kit, plz connect it to the DB properly :heart:
// Currently dragging is buggy and z-index isn't connected at all (has its own special function)
export default function FlipCard({ card, setCard }: FlipCardProps) {
  const [dragging, setDragging] = useState(false);
  const [zIndex, setZIndex] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const front = (
    <Image
      className="pointer-events-none"
      src={getCardUrl(card.type)}
      width={88}
      height={124}
      alt={card.type}
    />
  );
  const back = (
    <Image
      className="pointer-events-none"
      src="/Cards/Backs/Red Back.webp"
      width={88}
      height={124}
      alt={card.type}
    />
  );

  useEffect(() => {
    if (card) {
      setZIndex(card.z ?? 0);
    }
  }, [card]);

  const dragStart = useRef({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const bringToFront = () => {
    globalZIndex += 1;
    setZIndex(globalZIndex);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    bringToFront();
    setDragging(true);
    setHasDragged(false);
    dragStart.current = {
      x: e.clientX - card.x,
      y: e.clientY - card.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const x = e.clientX - dragStart.current.x;
      const y = e.clientY - dragStart.current.y;
      setHasDragged(true);
      setCard({ ...card, x, y });
    };

    const handleMouseUp = () => {
      setDragging(false);
      // Save updated card state to parent
      setCard({
        ...card,
        x: card.x,
        y: card.y,
        z: zIndex,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, zIndex, card, setCard]);

  return (
    <div
      ref={cardRef}
      onClick={() => {
        if (!hasDragged) {
          setCard({ ...card, visible: !card.visible });
          bringToFront();
        }
      }}
      onDrag={(e) => e.stopPropagation()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!hasDragged) {
            setCard({ ...card, visible: !card.visible });
            bringToFront();
          }
        }
      }}
      onMouseDown={handleMouseDown}
      className="perspective absolute h-24 w-17.5 cursor-grab bg-transparent p-0 active:cursor-grabbing"
      style={{
        left: card.x,
        top: card.y,
        zIndex: zIndex,
      }}
    >
      <div
        className={`preserve-3d relative h-full w-full rounded-xl transition-transform duration-700 ${
          !card.visible ? "rotate-y-180" : ""
        } ${dragging ? "shadow-[0_8px_30px_rgba(0,0,0,0.4)]" : "shadow-2xl"}`}
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
