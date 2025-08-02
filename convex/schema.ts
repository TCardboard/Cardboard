import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  card: defineTable({
    Position: v.object({ x: v.float64(), y: v.float64() }),
    data: v.object({}),
    id: v.string(),
    type: v.string(),
  }),
  tasks: defineTable({
    isCompleted: v.boolean(),
    text: v.string(),
  }),
});
