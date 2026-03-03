import { TSelectEmi } from "@/db/schema";
import { formatCurrency, ORDINAL } from "@/utils/lib";
import { Text, View } from "react-native";

// const TODAY = new Date().getDate();
export default function EmiSummaryCard({
  totalMonthly,
  emis,
}: {
  totalMonthly: number;
  emis: TSelectEmi[];
}) {
  return (
    <View className="flex flex-1">
      <View className="bg-linear-to-br from-indigo-950 via-slate-900 to-slate-900 p-5 rounded-2xl border border-indigo-800/60 shadow-xl">
        <Text className="text-indigo-300 text-sm font-medium mb-1">
          Total Monthly EMI
        </Text>
        <Text className="text-3xl font-bold text-white">
          ${formatCurrency(totalMonthly)}
        </Text>
        <View className="flex flex-row gap-4 mt-4">
          <View className="flex-1 bg-slate-800/60 rounded-lg p-3">
            <Text className="text-slate-400 text-xs mb-1">Active EMIs</Text>
            <Text className="text-white font-bold text-lg">{emis.length}</Text>
          </View>
          <View className="flex-1 bg-slate-800/60 rounded-xl p-3">
            <Text className="text-slate-400 text-xs mb-1">Next Deduction</Text>
            <Text className="text-white font-bold text-lg">
              {emis.length > 0 ? `${ORDINAL(emis[0].date)}` : "—"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
