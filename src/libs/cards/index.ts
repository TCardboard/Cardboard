export const getCardUrl = (cardDetails: string) => {
  const split = cardDetails.split("-");
  const rank = capitalize(split[0]);
  const suit = capitalize(split[1]);
  return `/Cards/${suit}/${rank}.webp`;
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}