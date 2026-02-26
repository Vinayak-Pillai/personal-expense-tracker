import Footer from "@/components/globals/footer";
import Header from "@/components/homepage/header";
import QuickActions from "@/components/homepage/quick-actions";
import QuickStats from "@/components/homepage/quick-stats";
import RecentTransactions from "@/components/homepage/recent-transactions";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 dark bg-background p-2" style={{ flex: 1, paddingTop: insets.top }}>
      <Header totalBalance={500} />
      <QuickStats expense={100} income={1000} />
      <QuickActions />
      <RecentTransactions />
      <Footer />
    </View>
  );
}
