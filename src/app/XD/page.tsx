"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { mutation } from "../../../convex/_generated/server";
import { v } from "convex/values";

const createTask = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("tasks", {
      text: args.text,
      isCompleted: false,
    });
    return newTaskId;
  },
});

export default function Home() {
  const tasks = useQuery(api.tasks.get);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col p-4">
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="bg-white">
            tasks: {tasks?.map(({ _id, text }) => <div key={_id}>{text}</div>)}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
}

const Card = ({ title, content }: { title: string; content: string }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{content}</p>
    </div>
  );
};
