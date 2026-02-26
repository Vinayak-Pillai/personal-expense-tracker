import {
  EllipsisHorizontal,
  TrendingUp,
  Wallet,
} from "@/components/icons/homepage-icons";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function QuickActions() {
  return (
    <View className="flex-col gap-3 mt-4">
      <Text className="text-accent-foreground/70 font-semibold text-[12px]">
        Quick Actions
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="gap-4"
        className="flex-row py-2"
      >
        <Link href="/">
          <View className="flex flex-col items-center justify-center gap-2 w-18">
            <View className="w-14 h-14 rounded-2xl bg-action-invest-bg/20 flex items-center justify-center border border-action-invest-border/30">
              <TrendingUp className="w-6 h-6" color="#8b5cf6" />
            </View>
            <Text className="text-sm text-muted-foreground font-medium leading-none">
              Invest
            </Text>
          </View>
        </Link>
        <Link href="/">
          <View className="flex flex-col items-center justify-center gap-2 w-18">
            <View className="w-14 h-14 rounded-2xl bg-action-accounts-bg/20 flex items-center justify-center border border-action-accounts-border/30">
              <Wallet className="w-6 h-6" color="#f59e0b" />
            </View>
            <Text className="text-sm text-muted-foreground font-medium leading-none">
              Accounts
            </Text>
          </View>
        </Link>
        <Link href="/">
          <View className="flex flex-col items-center justify-center gap-2 w-18">
            <View className="w-14 h-14 rounded-2xl bg-action-more-bg/20 flex items-center justify-center border border-action-more-border/30">
              <EllipsisHorizontal className="w-6 h-6" color="#0ea5e9" />
            </View>
            <Text className="text-sm text-muted-foreground font-medium leading-none">
              More
            </Text>
          </View>
        </Link>
      </ScrollView>
    </View>
  );
}
