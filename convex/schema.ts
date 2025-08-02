import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  card: defineTable({
    Position: v.object({ x: v.float64(), y: v.float64() }),
    data: v.object({}),
    id: v.string(),
    type: v.string(),
  }),
  cards: defineTable({
    playerId: v.union(v.id("users"), v.null()),
    type: v.string(),
    visible: v.boolean(),
    x: v.float64(),
    y: v.float64(),
    z: v.float64(),
  }),
  users: defineTable({
    name: v.string(),
  }),
});
