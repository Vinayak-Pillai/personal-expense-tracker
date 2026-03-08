import { THistoryTransactions } from "@/types/history.types";
import { TRANSACTION_TYPE } from "@/utils/init-values";
import { formatCurrency } from "@/utils/lib";
import { Text, View } from "react-native";
import { ArrowDownLeft, ArrowUpRight } from "../icons/homepage-icons";

export default function HistoryTransactionCard({
  transaction,
}: {
  transaction: THistoryTransactions;
}) {
  let formattedDate = transaction.date;
  if (transaction.date) {
    let d = new Date(transaction.date);
    if (isNaN(d.getTime()) && transaction.date.includes("/")) {
      const parts = transaction.date.split("/");
      if (parts.length === 3) {
        d = new Date(
          `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}T00:00:00Z`,
        );
      }
    }

    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleDateString("en-IN", {
        month: "short",
        day: "numeric",
      });
    }
  }

  return (
    <View className="bg-slate-900 my-2 border border-slate-800/60 p-4 rounded-2xl flex flex-row items-center justify-between shadow-sm">
      <View className="flex flex-row items-center gap-4">
        <View
          className={`w-12 h-12 rounded-full flex items-center justify-center ${transaction.type === 2 ? "bg-emerald-500/10" : "bg-rose-500/10"}`}
        >
          {transaction.type === 2 ? (
            <ArrowDownLeft color="#10b981" />
          ) : (
            <ArrowUpRight color="#f43f5e" />
          )}
        </View>
        <View>
          <Text className="text-white font-medium text-sm">
            {transaction.categoryName || "Unknown"}
          </Text>
          <View className="flex flex-row items-center gap-2 text-xs text-slate-500 mt-1">
            <Text className="bg-slate-800 px-2 py-0.5 rounded text-slate-400">
              {transaction.note
                ? transaction.note
                : `${TRANSACTION_TYPE[transaction.type as 1 | 2]} ${transaction.type === 2 ? `from ${transaction.categoryName}` : ``}`}
            </Text>
            <Text className="text-slate-500">•</Text>
            <Text className="text-slate-500">{transaction.accountName}</Text>
          </View>
        </View>
      </View>
      <View className="text-right">
        <Text
          className={`font-bold ${transaction.type === 2 ? "text-emerald-400" : "text-rose-400"}`}
        >
          {transaction.type === 2 ? "+" : "-"}₹
          {formatCurrency(transaction.amount)}
        </Text>
        {transaction.date && (
          <Text className="text-[10px] text-center text-slate-600 mt-1">
            {formattedDate}
          </Text>
        )}
      </View>
    </View>
  );
}
