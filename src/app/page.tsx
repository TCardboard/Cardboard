"use client";

import FlipCard from "@/components/(PlayingCard)/FlipCard";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import type { CardType } from "@/utils/types";
import Button from "@/components/button";

export default function Home() {
  const tasks = useQuery(api.tasks.get);

  const initialCards: CardType[] = [
    { id: "4-hearts", x: 100, y: 100, z: 1, visible: true },
    { id: "5-hearts", x: 220, y: 100, z: 2, visible: true },
    { id: "6-hearts", x: 340, y: 100, z: 3, visible: true },
  ];

  const [cards, setCards] = useState<CardType[]>(initialCards);

  const setCard = (updatedCard: CardType) => {
    setCards((prevCards) =>
      prevCards.map((card) => (card.id === updatedCard.id ? updatedCard : card))
    );
  };

  const reshuffle = () => {
    const shuffled = [...cards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({
        ...card,
        x: 100 + index * 120,
        z: index + 1,
      }));
    setCards(shuffled);
  };

  const newGame = () => {
    const newCards: CardType[] = [
      { id: "7-hearts", x: 100, y: 100, z: 1, visible: true },
      { id: "8-hearts", x: 220, y: 100, z: 2, visible: true },
      { id: "9-hearts", x: 340, y: 100, z: 3, visible: true },
    ];
    setCards(newCards);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-4">
        <div className="flex min-h-screen flex-col items-center justify-between p-24 gap-6">
          <div className="bg-white">
            tasks:{" "}
            {tasks?.map(({ _id, text }) => (
              <div key={_id}>{text}</div>
            ))}
          </div>

          <div className="flex gap-4">
            <Button label="Reshuffle" onClick={reshuffle} />
            <Button label="New Game" variant="secondary" onClick={newGame} />
          </div>

          <div className="relative w-full h-[500px]">
            {cards.map((card) => (
              <FlipCard
                key={card.id}
                card={card}
                setCard={setCard}
                front={<div className="font-semibold text-xl">{card.id} Front</div>}
                back={<div className="font-semibold text-xl">{card.id} Back</div>}
              />
            ))}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
