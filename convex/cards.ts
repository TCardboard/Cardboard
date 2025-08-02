import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { cardSchema } from "./schema";

// Return all cards from the database
export const getAllCards = query({
  args: {},
  handler: async (ctx, _args) => {
    return await ctx.db.query("cards").collect();
  },
});

// Update a single card in the database by ID
export const updateCard = mutation({
  args: {
    cardId: v.id("cards"),
    card: v.object(cardSchema),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.cardId, { ...args.card });
  },
});

// Wipe cards in DB and insert new cards
export const updateAllCards = mutation({
  args: {
    newCards: v.array(v.object({ _id: v.id("cards"), ...cardSchema })),
  },
  handler: async (ctx, args) => {
    const existingCards = await ctx.db.query("cards").collect();
    const existingIds = new Set(existingCards.map((card) => card._id));

    // This logic ensures if a card exists, the same card is updated rather than recreated
    for (const card of args.newCards) {
      if (existingIds.has(card._id)) {
        await ctx.db.patch(card._id, { ...card });
        existingIds.delete(card._id);
      } else {
        await ctx.db.insert("cards", card);
      }
    }

    for (const id of existingIds) {
      await ctx.db.delete(id);
    }
  },
});
