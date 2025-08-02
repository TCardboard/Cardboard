"use client";

import { useQuery } from "convex/react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { api } from "../../convex/_generated/api";

import FlipCard from "@/components/(PlayingCard)/FlipCard";

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

          <FlipCard
            front={<div className="font-semibold text-xl ">Front</div>}
            back={<div className="font-semibold text-xl ">Back</div>}
          />
          <FlipCard
            front={<div className="font-semibold text-xl ">Front</div>}
            back={<div className="font-semibold text-xl ">Back</div>}
          />
          <FlipCard
            front={<div className="font-semibold text-xl ">Front</div>}
            back={<div className="font-semibold text-xl ">Back</div>}
          />
        </div>
      </main>
    </SidebarProvider>
  );
}
