"use client";

import { useQuery } from "convex/react";
import FlipCard from "@/components/(PlayingCard)/FlipCard";
import Button from "@/components/button";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api.tasks.get);

  const handleReshuffle = () => {
    console.log("Reshuffle clicked");
    // might not be necessary to implement reshuffle logic here
  };

  const handleNewGame = () => {
    console.log("New Game clicked");
    // might not be necessary to implement new game logic here
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
            <Button label="Reshuffle" onClick={handleReshuffle} />
            <Button label="New Game" variant="secondary" onClick={handleNewGame} />
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}
