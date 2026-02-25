export const formatCurrency = (
  amount: number = 0,
  format: string = "en-IN",
) => {
  return amount.toLocaleString(format, { maximumFractionDigits: 2 });
};
