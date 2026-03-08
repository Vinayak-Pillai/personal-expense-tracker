import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
} from "@/components/icons/homepage-icons";
import { db } from "@/db";
import { categories, transactions as Transactions } from "@/db/schema";
import { formatCurrency } from "@/utils/lib";
import { desc, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Link } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function RecentTransactions() {
  const { data: transactions } = useLiveQuery(
    db
      .select({
        id: Transactions.id,
        type: Transactions.type,
        amount: Transactions.amount,
        date: Transactions.date,
        category: categories.name,
      })
      .from(Transactions)
      .innerJoin(categories, eq(categories.id, Transactions.categoryId))
      .orderBy(desc(Transactions.id))
      .limit(10),
  );

  return (
    <View className="mt-4 flex-1">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-accent-foreground/70 font-semibold text-[12px]">
          Recent Transactions
        </Text>
        <Link
          href="/"
          className="text-indigo-400 text-sm font-medium flex-row items-center"
        >
          View All <ChevronRight className="w-3 h-3 ml-0.5" />
        </Link>
      </View>
      <FlatList
        data={transactions}
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32"
        renderItem={({ item }) => {
          const isIncome = item.type === 2;
          return (
            <View
              key={item.id}
              className="my-2 bg-slate-900/50 p-3 rounded-2xl border border-slate-800/50 flex-row items-center justify-between"
            >
              <View className="flex-row items-center gap-3">
                <View
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${isIncome ? "bg-emerald-500/10" : "bg-rose-500/10"}`}
                >
                  {isIncome ? (
                    <ArrowDownLeft className="w-5 h-5" color="#10b981" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5" color="#f43f5e" />
                  )}
                </View>
                <View>
                  <Text className="text-slate-200 font-medium text-sm">
                    {item.category || "Transaction"}
                  </Text>
                  <Text className="text-slate-500 text-sm">{item.date}</Text>
                </View>
              </View>
              <Text
                className={`font-semibold ${isIncome ? "text-emerald-400" : "text-slate-200"}`}
              >
                {isIncome ? "+" : "-"} ₹{formatCurrency(item.amount)}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
