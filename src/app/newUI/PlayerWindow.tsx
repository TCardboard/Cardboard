import { cn } from "@/libs/utils";
import { api } from "@root/convex/_generated/api";
import { useQuery } from "convex/react";
import { AnimatePresence, motion, stagger } from "motion/react";
import Image from "next/image";
import type { HTMLAttributes } from "react";
import { RandomCard } from "./page";
import { WindowContainer, WindowContent, WindowHeader } from "./Window";

export const PlayerWindow = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const cards = useQuery(api.cards.getAllCards) ?? [];

  // filter cards by player here
  console.log(cards);

  return (
    <WindowContainer
      {...props}
      className={cn("w-min min-w-[250px] bg-white", props.className)}
    >
      <WindowHeader className="px-2">Player</WindowHeader>
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
