import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const TYPES = [
  {
    id: 1,
    name: "Expense",
    styling: "bg-rose-600 text-white shadow-lg shadow-rose-900/40",
  },
  {
    id: 2,
    name: "Income",
    styling: "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40",
  },
];

export default function AddTransactionsForm() {
  const [currentType, setCurrentType] = useState(1);
  const [amount, setAmount] = useState<number | null>(null);

  const handleTypeChange = (type: number) => {
    setCurrentType(type);
    setAmount(null);
  };

  return (
    <View className="p-4 pb-24 space-y-6">
      <View className="bg-slate-900 p-1 rounded-xl flex-row w-full">
        {TYPES.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => handleTypeChange(item.id)}
            className={`flex-1 py-3 rounded-lg items-center justify-center will-change-variable ${
              currentType === item.id ? item.styling : "hover:bg-slate-800"
            }`}
          >
            <Text
              className={`text-sm font-semibold will-change-variable ${
                currentType === item.id ? "text-white" : "text-slate-400"
              }`}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-col items-center gap-2">
        <Text className="text-slate-500 text-2xl font-bold align-top mt-2 inline-block">
          ₹
        </Text>
        <TextInput
          className="bg-transparent text-5xl  text-white"
          inputMode="numeric"
          placeholder="0.00"
          placeholderTextColor="#717182"
          value={amount?.toString() || ""}
          onChangeText={(e) => setAmount(Number(e))}
        />
      </View>

      <View className="space-y-4">
        <View className="space-y-2">
          <Text className="text-sm font-semibold text-slate-400 ml-1 uppercase tracking-wider">
            Category
          </Text>
        </View>
      </View>
    </View>
  );
}
