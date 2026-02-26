import { Wallet } from "@components/icons/homepage-icons";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Header({ totalBalance = 0 }: { totalBalance: number }) {
  return (
    <View>
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-foreground/40 text-sm font-medium">
            Total Balance
          </Text>
          <Text className="text-3xl font-bold text-white mt-1">
            ₹
            {totalBalance.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </Text>
        </View>
        <Link
          href="/"
          className="p-2 bg-slate-800 rounded-full active:bg-slate-700"
        >
          <Wallet className="w-6 h-6" color="#818cf8" />
        </Link>
      </View>
    </View>
  );
}
