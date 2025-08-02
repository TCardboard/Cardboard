import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const updateNode = mutation({
  args: {
    id: v.string(),
    position: v.object({
      x: v.float64(),
      y: v.float64(),
    }),
    data: v.any(), // node data
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      position: args.position,
      data: args.data,
    });
  },
});
