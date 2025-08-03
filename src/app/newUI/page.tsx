"use client";

import { useLocalPlayer } from "@/libs/utils/hooks";
import type { CardType } from "@/utils/types";
import { api } from "@root/convex/_generated/api";
import { useMutation } from "convex/react";
import { AnimatePresence } from "motion/react";
import Image from "next/image";
import CanvasCard from "../gaming/_components/CanvasCard";
import { ChatRoom } from "./ChatRoom";
import { Clock } from "./Clock";
import { EnterGame } from "./EnterGame";
import { GameRoom } from "./GameRoom";
import { WindowContainer, WindowContent, WindowHeader } from "./Window";

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

const Board = () => {
  const { player } = useLocalPlayer();

  return (
    <>
      <WindowContainer className="size-full">
        <WindowHeader>Card Board</WindowHeader>
        <WindowContent>{player ? <GameRoom /> : <EnterGame />}</WindowContent>
      </WindowContainer>
      <Clock />
      <ChatRoom />
    </>
  );
};

export function RandomCard({ card }: { card: CardType }) {
  const updateCard = useMutation(api.cards.updateCard);
  const setCard = (updatedCard: CardType) => {
    updateCard({ cardId: card._id, card: updatedCard });
  };
  return <CanvasCard id={card._id} card={card} setCard={setCard} />;
}

// TODO: Ashton could you add this to Kevin's CanvasCard component?

// const Card = ({ card, rotate }: { card: CardTypeTemp; rotate: number }) => {
//   const cardVariants = useMemo(
//     () => ({
//       initial: { opacity: 0, x: "100%", rotate },
//       animate: { opacity: 1, x: 0, rotate: rotate / 20 },
//       exit: { opacity: 0, y: "25%", rotate: rotate * 0.5 },
//     }),
//     [rotate]
//   );

//   return (
//     <motion.div
//       key={card.id}
//       variants={cardVariants}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       className=" h-min min-h-[calc(35px*1.8)] min-w-[calc(25px*1.8)] border border-white bg-secondary shadow-2xl"
//     />
//   );
// };
