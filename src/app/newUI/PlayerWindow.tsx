import { api } from "@root/convex/_generated/api";
import { useQuery } from "convex/react";
import { AnimatePresence, motion, stagger } from "motion/react";
import Image from "next/image";

import { type HTMLAttributes, use } from "react";
import { cn } from "@/libs/utils";
import type { CardType, UserType } from "@/utils/types";

import { RandomCard } from "./page";
import { WindowContainer, WindowContent, WindowHeader } from "./Window";

export type PlayerWindowProps = HTMLAttributes<HTMLDivElement> & {
  user: UserType;
};
export const PlayerWindow = ({ user, ...props }: PlayerWindowProps) => {
  let cards: CardType[] = [];
  let playerName = "No Player";
  if (user) {
    playerName = user.name;
    cards = useQuery(api.cards.getPlayersCards, { userId: user._id }) ?? [];
    console.log(user._id);
  }

  console.log(cards);

  return (
    <WindowContainer
      {...props}
      className={cn("w-min min-w-[250px] bg-white", props.className)}
    >
      <WindowHeader className="px-2">{playerName}</WindowHeader>
      <WindowContent className="flex-row">
        <div className="relative h-16 w-16 select-none">
          <p className="absolute right-0 bottom-0 z-50 w-min whitespace-nowrap bg-secondary p-1 py-0 text-white">
            {cards.length}
          </p>
          <Image
            fill
            src="/player.png"
            alt="player"
            priority
            className="pointer-events-none object-fill"
          />
        </div>

        <motion.div
          className="*:-mr-10.5 flex max-w-[250px] items-center justify-between"
          initial="initial"
          animate="animate"
          transition={{ delayChildren: stagger(0.4) }}>
          <AnimatePresence mode="popLayout">
            {cards.map((card) => {
              return <RandomCard key={card._id} card={card} />;
            })}
          </AnimatePresence>
        </motion.div>
      </WindowContent>
    </WindowContainer>
  );
};
