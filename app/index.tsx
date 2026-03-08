import Footer from "@/components/globals/footer";
import Header from "@/components/homepage/header";
import QuickActions from "@/components/homepage/quick-actions";
import QuickStats from "@/components/homepage/quick-stats";
import RecentTransactions from "@/components/homepage/recent-transactions";
import { useTheme } from "@/components/theme/theme-context";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View
      className={`flex-1 bg-background p-2 ${theme === 'dark' ? 'dark' : ''}`}
      style={{ flex: 1, paddingTop: insets.top }}
    >
      <Header />
      <QuickStats />
      <QuickActions />
      <RecentTransactions />
      <Footer />
    </View>
  );
}
