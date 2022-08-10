export const roundNumber = (number: number, decimalsAmount: number = 2) => {
  const decimals = Math.pow(10, decimalsAmount);
  return Math.round(number * decimals) / decimals;
};
