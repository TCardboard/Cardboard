import { api } from "@root/convex/_generated/api";
import { useQuery } from "convex/react";
import { AnimatePresence, motion, stagger } from "motion/react";
import Image from "next/image";
import type { HTMLAttributes } from "react";
import { cn } from "@/libs/utils";
import type { CardType, UserType } from "@/utils/types";
import { RandomCard } from "./page";
import { WindowContainer, WindowContent, WindowHeader } from "./Window";

export type PlayerWindowProps = HTMLAttributes<HTMLDivElement> & {
  user: UserType;
};
export const PlayerWindow = ({ user, ...props }: PlayerWindowProps) => {
  let cards: CardType[] = [];
  const playerName = "No Player";
  if (user != null) {
    cards = useQuery(api.cards.getPlayersCards, { userId: user._id }) ?? [];
  }

  // filter cards by player here
  console.log(cards);

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
              return <RandomCard key={card._id} card={card} />;
            })}
          </AnimatePresence>
        </motion.div>
      </WindowContent>
    </WindowContainer>
  );
};
