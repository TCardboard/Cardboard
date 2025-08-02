import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const cardSchema = {
  playerId: v.union(v.id("users"), v.null()),
  type: v.string(),
  visible: v.boolean(),
  x: v.float64(),
  y: v.float64(),
  z: v.float64(),
};

export const userSchema = {
  name: v.string(),
};

export const messageSchema = {
  user: v.string(),
  body: v.string(),
};

export default defineSchema({
  cards: defineTable(cardSchema),
  users: defineTable(userSchema),
  messages: defineTable(messageSchema),
});

