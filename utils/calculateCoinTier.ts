const calculateCoinTier = (max: number, curr: number) => {
  const percentage = (curr / max) * 100;
  if (curr === 1) return 1;

  if (percentage >= 70) return 9;
  if (percentage >= 58) return 8;
  if (percentage >= 40) return 7;
  if (percentage >= 28) return 6;
  if (percentage >= 12) return 5;
  if (percentage >= 8) return 4;
  if (percentage >= 3) return 3;
  return 2;
};

export default calculateCoinTier;
