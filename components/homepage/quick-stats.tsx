import { ArrowDownLeft, ArrowUpRight } from "@/components/icons/homepage-icons";
import { formatCurrency } from "@/utils/lib";
import { Text, View } from "react-native";

export default function QuickStats({
  income,
  expense,
}: {
  income: number;
  expense: number;
}) {
  return (
    <View className="flex-row gap-3">
      <View className="flex-1 bg-stat-card-bg p-4 rounded-2xl border border-stat-card-border flex-col justify-between">
        <View className="bg-stat-success/10 w-8 h-8 rounded-full flex items-center justify-center mb-3">
          <ArrowDownLeft className="w-5 h-5" color="#10b981" />
        </View>
        <View>
          <Text className="text-stat-card-muted text-sm font-medium">
            Income
          </Text>
          <Text className="text-lg font-bold text-stat-success-text mt-1">
            +₹{formatCurrency(income)}
          </Text>
        </View>
      </View>
      <View className="flex-1 bg-stat-card-bg p-4 rounded-2xl border border-stat-card-border flex-col justify-between">
        <View className="bg-stat-danger/10 w-8 h-8 rounded-full flex items-center justify-center mb-3">
          <ArrowUpRight className="w-5 h-5" color="#f43f5e" />
        </View>
        <View>
          <Text className="text-stat-card-muted text-sm font-medium">
            Expense
          </Text>
          <Text className="text-lg font-bold text-stat-danger-text mt-1">
            -₹{formatCurrency(expense)}
          </Text>
        </View>
      </View>
    </View>
  );
}
