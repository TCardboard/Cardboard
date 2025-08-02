"use client";

import { useQuery } from "convex/react";
import FlipCard from "@/components/(PlayingCard)/FlipCard";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api.tasks.get);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-4">
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="bg-white">
            tasks:{" "}
            {tasks?.map(({ _id, text }) => (
              <div key={_id}>{text}</div>
            ))}
          </div>

          <FlipCard cardID="4-hearts" />
          <FlipCard cardID="5-hearts" />
          <FlipCard cardID="6-hearts" />
        </div>
      </main>
    </SidebarProvider>
  );
}
