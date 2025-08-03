"use client";

import { useMutation, useQuery } from "convex/react";
import FlipCard from "@/components/(PlayingCard)/FlipCard";
import Button from "@/components/button";
import XpWindowControls from "@/components/controlbutton";
import type { CardType } from "@/utils/types";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const cards = useQuery(api.cards.getAllCards) ?? [];
  const updateCard = useMutation(api.cards.updateCard).withOptimisticUpdate(
    (localStore, args) => {
      const { card, cardId } = args;
      const currentValue = localStore.getQuery(api.cards.getAllCards);
      if (currentValue !== undefined) {
        const updatedCards = currentValue.map((existingCard) =>
          existingCard._id === cardId
            ? { ...existingCard, ...card }
            : existingCard
        );
        localStore.setQuery(api.cards.getAllCards, {}, updatedCards);
      }
    }
  );
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

  const handleMinimize = () => alert("Minimize clicked");
  const handleMaximize = () => alert("Maximize clicked");
  const handleClose = () => alert("Close clicked");

  return (
    <main className="relative flex h-dvh max-h-dvh flex-1 flex-col overflow-hidden p-4">
      <div className="flex min-h-screen flex-col items-center justify-between gap-6 p-24">
        <XpWindowControls
          onMinimize={handleMinimize}
          onMaximize={handleMaximize}
          onClose={handleClose}
        />

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
            <FlipCard key={card._id} card={card} setCard={setCard} />
          ))}
        </div>
      </div>
    </main>
  );
}
