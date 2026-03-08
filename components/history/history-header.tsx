import { THistoryFilters } from "@/types/history.types";
import { Pressable, Text, View } from "react-native";

export default function HistoryHeder({
  filter,
  handleFilterSelection,
}: {
  filter: THistoryFilters;
  handleFilterSelection: (value: THistoryFilters) => void;
}) {
  return (
    <View className="flex flex-row justify-between items-center mb-6">
      <Text className="text-2xl font-bold text-foreground">Transactions</Text>
      <View className="flex flex-row gap-2 bg-secondary rounded-lg p-1">
        {(["all", "income", "expense"] as THistoryFilters[]).map((f) => (
          <Pressable key={f} onPress={() => handleFilterSelection(f)}>
            <Text
              // transition-colors needed
              className={`px-4 py-1.5 text-sm rounded-lg capitalize will-change-auto  ${
                filter === f
                  ? "bg-slate-700 text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-slate-200"
              }`}
            >
              {f}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
