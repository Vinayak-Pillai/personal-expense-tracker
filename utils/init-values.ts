import { Transactions } from "@/types/init-values.types";

export const INITIAL_TRANSACTIONS: Transactions[] = [
  {
    id: "1",
    amount: 150.0,
    type: "expense",
    categoryId: "1",
    accountId: "1",
    date: new Date().toISOString(),
  },
  {
    id: "2",
    amount: 4500.0,
    type: "income",
    categoryId: "3",
    accountId: "1",
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: "3",
    amount: 50.0,
    type: "expense",
    categoryId: "4",
    accountId: "3",
    date: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];
