export const getCardUrl = (cardDetails: string) => {
  const split = cardDetails.split("-");
  const rank = split[0];
  const suit = split[1];
  return `/Cards/${suit}/${rank}.webp`;
};
