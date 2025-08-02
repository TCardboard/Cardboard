"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-4">
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="bg-white">
            tasks: {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
          </div>
        </main>
      </main>
    </SidebarProvider>
  );
}
