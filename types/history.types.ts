export type THistoryFilters = "all" | "income" | "expense";

export type THistoryTransactions = {
  id: number;
  amount: number;
  categoryName: string;
  accountName: string;
  note: string | null;
  type: number;
  date: string | null;
};
