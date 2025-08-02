"use client";

import FlipCard from "@/components/(PlayingCard)/FlipCard";
import { AppSidebar } from "@/components/app-sidebar";
import Button from "@/components/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { CardType } from "@/utils/types";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const cards = useQuery(api.cards.getAllCards) ?? [];
  const updateCard = useMutation(api.cards.updateCard);
  const shuffleCards = useMutation(api.cards.shuffleCards);
  const newGame = useMutation(api.cards.newGame);

  const setCard = (updatedCard: CardType) => {
    const { _id, _creationTime, ...strippedUpdatedCard } = updatedCard;
    console.log("setCard", updatedCard, strippedUpdatedCard);
    updateCard({ cardId: _id, card: strippedUpdatedCard });
  };

  const reshuffle = () => {
    shuffleCards();
  };

  const startNewGame = () => {
    newGame();
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-4">
        <div className="flex min-h-screen flex-col items-center justify-between gap-6 p-24">
          <div className="bg-white">
            cards:
            {cards?.map((card) => (
              <div key={card._id}>{JSON.stringify(card)}</div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button label="Reshuffle" onClick={reshuffle} />
            <Button label="New Game" onClick={startNewGame} />
          </div>

          <div className="relative h-[500px] w-full">
            {cards.map((card) => (
              <FlipCard
                key={card._id}
                card={card}
                setCard={setCard}
                front={
                  <div className="font-semibold text-xl">{card._id} Front</div>
                }
                back={
                  <div className="font-semibold text-xl">{card._id} Back</div>
                }
              />
            ))}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
