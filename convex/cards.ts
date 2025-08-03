import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";
import { internal,api } from "./_generated/api";
import { cardSchema } from "./schema";

// Return all cards from the database
export const getAllCards = query({
  handler: async (ctx) => {
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
    return await ctx.db.get(args.cardId);
  },
});

// Move a single card to the top of the stack visually (z-index)
export const moveCardToTop = mutation({
  args: {
    cardId: v.id("cards"),
  },
  handler: async (ctx, args) => {
    const existingCards = await ctx.db.query("cards").collect();
    const maxZIndex = Math.max(
      ...existingCards.map((card) => card.z),
      -Infinity
    );
    await ctx.db.patch(args.cardId, { z: maxZIndex + 1 });
  },
});
 
// Shuffle all cards in the database: randomize their z-index and set (x, y) to (200, 100)
export const shuffleCards = mutation({
  handler: async (ctx) => {
    const existingCards = await ctx.db.query("cards").collect();
    const shuffledCards = existingCards.sort(() => Math.random() - 0.5);
    shuffledCards.forEach((card, i) => {
      ctx.db.patch(card._id, { z: i, x: 200, y: 100 });
    });
  },
});

const suits = ["hearts","spade","diamonds","clubs"]
const ranks = ["Ace","2","3","4","5","6","7","8","9","10","Jack","Queen","King"]
const generateNewCards = ()=>{
  const newCards = []
  for (let i = 0; i < suits.length; i++) {
    const suit = suits[i];
    for (let j = 0; j<ranks.length;j++){
      const rank = ranks[j]
      const type = rank + "-" + suit
      newCards.push({ type: type, playerId: null, visible: true, x: 200, y: 100, z: 1 })
    }
  }
  return newCards
}
// New game: wipe DB and insert a new set of cards
export const newGame = mutation({
  handler: async (ctx) => {
    const newCards = generateNewCards()
    const existingCards = await ctx.db.query("cards").collect();
    for (const card of existingCards) {
      await ctx.db.delete(card._id);
    }
    await Promise.all(newCards.map((card) => ctx.db.insert("cards", card)));
    await ctx.runMutation(api.cards.shuffleCards);
  },
});

// Wipe cards in DB and insert new cards (try avoid using this in favour of the other functions, but it's here if needed)
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
