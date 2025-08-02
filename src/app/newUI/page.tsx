"use client";

import { AnimatePresence, motion, stagger } from "motion/react";
import Image from "next/image";
import {
  createContext,
  type HTMLAttributes,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import { ChatRoom } from "./ChatRoom";
import { Clock } from "./Clock";
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

type CardType = {
  id: string;
};

type PlayerCtxType = {
  name: string;
  room: string;
  cards: CardType[];
  setName: (name: string) => void;
  setRoom: (name: string) => void;
  setCards: (cards: CardType[] | ((prev: CardType[]) => CardType[])) => void;
};

const PlayerContext = createContext({} as PlayerCtxType);

const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("useName must be used within a NameContext Provider");
  }
  return context;
};

const Board = () => {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState("");
  const [cards, setCards] = useState<CardType[]>([
    { id: "1" },
    { id: "2" },
    { id: "3" },
  ]);

  return (
    <>
      <PlayerContext.Provider
        value={{ name, cards, room, setName, setCards, setRoom }}
      >
        <WindowContainer className="size-full">
          <WindowHeader>Card Board</WindowHeader>
          <WindowContent>{name ? <GameRoom /> : <EnterGame />}</WindowContent>
        </WindowContainer>
        <Clock />
      </PlayerContext.Provider>
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
          setCards((prev: CardType[]) => prev.slice(0, prev.length - 1));
        }}
      >
        Pop a card!
      </Button>
    </>
  );
};

const EnterGame = () => {
  const { setName } = usePlayer();
  const [inputName, setInputName] = useState("");
  const [room, setRoom] = useState("");

  const handleSetName = () => {
    setName(inputName);
  };

  return (
    <div className="flex size-full items-center justify-center gap-6">
      <div className="flex gap-6">
        <Image
          src="/carddeck.png"
          alt="carddeck"
          width={150}
          height={150}
          className="aspect-square size-[150px] opacity-80 bg-blend-multiply"
        />
        <div className="w-px flex-1 bg-secondary"></div>
        <div className="flex flex-col gap-2 pl-12">
          <div className="flex flex-col">
            <p>Name:</p>
            <Input
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <p>Room Id:</p>
            <Input value={room} onChange={(e) => setRoom(e.target.value)} />
          </div>
          <Button className="mt-2" onClick={handleSetName}>
            Enter
          </Button>
        </div>
      </div>
    </div>
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

export function RandomCard({ card }: { card: CardType }) {
  const [rotation, setRotation] = useState<number | null>(null);

  useEffect(() => {
    setRotation(Math.random() * 360 - 180);
  }, []);

  if (rotation === null) return null; // optional: skeleton here

  return <Card card={card} rotate={rotation} />;
}

const Card = ({ card, rotate }: { card: CardType; rotate: number }) => {
  const cardVariants = useMemo(
    () => ({
      initial: { opacity: 0, x: "100%", rotate },
      animate: { opacity: 1, x: 0, rotate: rotate / 20 },
      exit: { opacity: 0, y: "25%", rotate: rotate * 0.5 },
    }),
    [rotate],
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
