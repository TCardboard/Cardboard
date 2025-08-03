"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { CardType } from "@/utils/types";
import Board from "./Board";
import { ShuffleButton } from "./ShuffleButton";

export default function NewUIPage() {
  return (
    <div className="relative flex h-screen flex-col items-center justify-center p-32 py-24">
      <Image
        src="/WindowUI.png"
        alt="WindowUI"
        fill
        sizes="100%"
        priority
        className="-z-50 object-fill"
      />
      <AnimatePresence mode="wait">
        <Board />
      </AnimatePresence>
    </div>
  );
}

export function RandomCard({ card }: { card: CardType }) {
  const [rotation, setRotation] = useState<number | null>(null);

  useEffect(() => {
    setRotation(Math.random() * 360 - 180);
  }, []);

  if (rotation === null) return null; // optional: skeleton here

  return <Card card={card} rotate={rotation} />;
}

// TODO: Ashton could you add this to Kevin's CanvasCard component?

const Card = ({ card, rotate }: { card: CardType; rotate: number }) => {
  const cardVariants = useMemo(
    () => ({
      initial: { opacity: 0, x: "100%", rotate },
      animate: { opacity: 1, x: 0, rotate: rotate / 20 },
      exit: { opacity: 0, y: "25%", rotate: rotate * 0.5 },
    }),
    [rotate]
  );

  return (
    <motion.div
      key={card._id}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className=" h-min min-h-[calc(35px*1.8)] min-w-[calc(25px*1.8)] border border-white bg-secondary shadow-2xl"
    />
  );
};
