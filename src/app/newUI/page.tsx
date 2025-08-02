"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";
import { AnimatePresence, motion, stagger } from "motion/react";
import Image from "next/image";
import { type HTMLAttributes, useEffect, useMemo, useState } from "react";
import { ChatRoom } from "./ChatRoom";
import { Clock } from "./Clock";
import { EnterGame } from "./EnterGame";
import { type CardTypeTemp, PlayerProvider, usePlayer } from "./PlayerContext";
import { WindowContainer, WindowContent, WindowHeader } from "./Window";
import { useLocalStorage } from "@/hooks/useLocalStorage";

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
  const [name, setName] = useLocalStorage("playerName", "");

  const [room, setRoom] = useState("");
  const [cards, setCards] = useState<CardTypeTemp[]>([
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ]);

  return (
    <>

      <PlayerContext.Provider
        value={{ name, cards, room, setName, setCards, setRoom }}
      >
        <WindowContainer className="size-full ">
          <WindowHeader>Card Board</WindowHeader>
          <WindowContent>{name ? <GameRoom /> : <EnterGame />}</WindowContent>
        </WindowContainer>
        <Clock />
      </PlayerProvider>
      <ChatRoom name={name} />
    </>
  );
};

const GameRoom = () => {
  const { setCards } = usePlayer();

  return (
    <>
      {/* top */}
      <PlayerWindow className="-translate-x-1/2 -translate-y-1/2 absolute top-0 left-1/2" />
      {/* left */}
      <PlayerWindow className="-translate-x-1/4 -translate-y-1/2 absolute top-1/2 left-0" />
      {/* right */}
      <PlayerWindow className="-translate-y-1/2 absolute top-1/2 right-0 translate-x-1/4" />
      <DropBox />
      <Button
        className="-translate-x-1/2 absolute bottom-0 left-1/2"
        onClick={() => {
          setCards((prev: CardTypeTemp[]) => prev.slice(0, prev.length - 1));
        }}
      >
        Pop a card!
      </Button>
    </>
  );
};

const DropBox = () => {
  return (
    <div className="-translate-x-1/2 absolute bottom-0 left-1/2 w-full px-48">
      <div className=" z-10 h-2 w-full border border-secondary border-b-0 p-8">
        {/* add card dropping function here */}
      </div>
    </div>
  );
};

const PlayerWindow = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const { cards } = usePlayer();

  // filter cards by player here

  return (
    <WindowContainer
      {...props}
      className={cn("w-min min-w-[250px] bg-white", props.className)}
    >
      <WindowHeader>Player</WindowHeader>
      <WindowContent className="flex-row">
        <div className="relative h-16 w-16 select-none">
          <Image
            fill
            src="/player.png"
            alt="player"
            priority
            className="pointer-events-none object-fill"
          />
        </div>

        <motion.div
          className="*:-mr-9 flex items-center justify-center"
          initial="initial"
          animate="animate"
          transition={{ delayChildren: stagger(0.4) }}
        >
          <AnimatePresence mode="popLayout">
            {cards.map((card) => {
              return <RandomCard key={card.id} card={card} />;
            })}
          </AnimatePresence>
        </motion.div>
      </WindowContent>
    </WindowContainer>
  );
};

export function RandomCard({ card }: { card: CardTypeTemp }) {
  const [rotation, setRotation] = useState<number | null>(null);

  useEffect(() => {
    setRotation(Math.random() * 360 - 180);
  }, []);

  if (rotation === null) return null; // optional: skeleton here

  return <Card card={card} rotate={rotation} />;
}

const Card = ({ card, rotate }: { card: CardTypeTemp; rotate: number }) => {
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
      key={card.id}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className=" h-min min-h-[calc(35px*1.8)] min-w-[calc(25px*1.8)] border border-white bg-secondary shadow-2xl"
    />
  );
};
