import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

export const getUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});
export const login = mutation({
  args: {
    name: v.string(),
    room: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db.query("users").withIndex("byName", (q) =>
      q.eq("name", args.name)
    ).unique();
    if (existingUser) {
      await ctx.db.patch(existingUser._id, {
        room: args.room,
      });
    } else {
      await ctx.db.insert("users", {
        name: args.name,
        room: args.room,
      });
    }
    return await ctx.db.query("users").withIndex("byName", (q) =>
      q.eq("name", args.name)
    ).unique();
  }
})
