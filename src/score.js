export default secret => guess => {
  const blacks = guess.filter((g, i)=> g === secret[i]).length;

  const remainderGuess = guess.filter((g, i)=> g !== secret[i]);
  const remainderSecret = secret.filter((s, i)=> s !== guess[i]);

  const guessBins = [0, 1, 2, 3, 4, 5]
    .map(i=> remainderGuess.filter(g => g === i).length);
  
  const secretBins = [0, 1, 2, 3, 4, 5]
    .map(i=> remainderSecret.filter(s => s === i).length);

  const whites = guessBins.reduce((total, g, i)=> total + Math.min(g, secretBins[i]), 0);

  return [blacks, whites];
};
