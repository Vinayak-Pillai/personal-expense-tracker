import SafeContainer from "@/components/globals/SafeContainer";
import HistoryHeder from "@/components/history/history-header";
import HistoryTransactionCard from "@/components/history/history-transaction-card";
import { db } from "@/db";
import { accounts, categories, transactions } from "@/db/schema";
import { THistoryFilters } from "@/types/history.types";
import { desc, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useMemo, useState } from "react";
import { FlatList } from "react-native";

export default function History() {
  const { data: transactionsHistory } = useLiveQuery(
    db
      .select({
        id: transactions.id,
        type: transactions.type,
        amount: transactions.amount,
        categoryName: categories.name,
        accountName: accounts.name,
        note: transactions.note,
        date: transactions.date,
      })
      .from(transactions)
      .innerJoin(accounts, eq(accounts.id, transactions.accountId))
      .innerJoin(categories, eq(categories.id, transactions.categoryId))
      .orderBy(desc(transactions.id)),
  );
  const [currentFilter, setCurrentFilter] = useState<THistoryFilters>("all");

  const filteredTransactions = useMemo(() => {
    if (!transactionsHistory) return [];
    if (currentFilter === "all") return transactionsHistory;
    return transactionsHistory.filter((t) =>
      currentFilter === "income" ? t.type === 2 : t.type === 1,
    );
  }, [transactionsHistory, currentFilter]);

  const handleFilterSelection = (value: THistoryFilters) => {
    setCurrentFilter(value);
  };

  return (
    <SafeContainer>
      <HistoryHeder
        filter={currentFilter}
        handleFilterSelection={handleFilterSelection}
      />
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return <HistoryTransactionCard transaction={item} />;
        }}
      />
    </SafeContainer>
  );
}
