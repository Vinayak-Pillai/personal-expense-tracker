import {
  ArrowDownLeft,
  ArrowUpRight,
  ChevronRight,
} from "@/components/icons/homepage-icons";
import { INITIAL_TRANSACTIONS } from "@/utils/init-values";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function RecentTransactions() {
  return (
    <View className="mt-4">
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
      <View className="flex-col gap-3">
        {INITIAL_TRANSACTIONS.map((t) => {
          const isIncome = t.type === "income";
          return (
            <View
              key={t.id}
              className="bg-slate-900/50 p-3 rounded-xl border border-slate-800/50 flex-row items-center justify-between"
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
                    {t.note || "Transaction"}
                  </Text>
                  <Text className="text-slate-500 text-sm">
                    {new Date(t.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <Text
                className={`font-semibold ${isIncome ? "text-emerald-400" : "text-slate-200"}`}
              >
                {isIncome ? "+" : "-"}${t.amount.toLocaleString()}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
