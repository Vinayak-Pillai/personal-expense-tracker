export const formatCurrency = (
  amount: number = 0,
  format: string = "en-IN",
) => {
  return amount.toLocaleString(format, { maximumFractionDigits: 2 });
};

export const ORDINAL = (n: number) => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
