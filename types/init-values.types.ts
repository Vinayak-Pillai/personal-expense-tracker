export type TransactionType = "income" | "expense" | "transfer";

export type Transactions = {
  id: string;
  amount: number;
  type: TransactionType;
  categoryId: string;
  accountId: string;
  date: string;
  note?: string;
};
