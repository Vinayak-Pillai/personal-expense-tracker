import { db } from "@/db";
import { accounts } from "@/db/schema";
import { formatCurrency } from "@/utils/lib";
import { Wallet } from "@components/icons/homepage-icons";
import { Ionicons } from "@expo/vector-icons";
import { eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../theme/theme-context";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const {
    data: [totalBalance],
  } = useLiveQuery(
    db
      .select({ balance: accounts.balance })
      .from(accounts)
      .where(eq(accounts.isPrimary, true)),
  );
  return (
    <View>
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-foreground/40 text-sm font-medium">
            Total Balance
          </Text>
          <Text className="text-3xl font-bold text-foreground mt-1">
            ₹{formatCurrency(totalBalance?.balance || 0)}
          </Text>
        </View>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity onPress={toggleTheme} className="p-2 rounded-full">
            <Ionicons name={theme === 'dark' ? 'sunny' : 'moon'} size={24} className="text-foreground" color="currentColor" />
          </TouchableOpacity>
          <Link
            href="/"
            className="p-2 bg-wallet-icon-bg rounded-full active:opacity-80"
          >
            <Wallet className="w-6 h-6 text-wallet-icon-color" />
          </Link>
        </View>
      </View>
    </View>
  );
}
