import EmiCard from "@/components/emi/emi-card";
import { EmiProvider } from "@/components/emi/emi-context";
import EmiHeader from "@/components/emi/emi-header";
import EmiSummaryCard from "@/components/emi/emi-summary-card";
import SafeContainer from "@/components/globals/SafeContainer";
import { db } from "@/db";
import { accounts, emi } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { FlatList, Text } from "react-native";

const TODAY = new Date().getDate();

const daysUntil = (day: number) => {
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), day);
  if (day >= now.getDate()) {
    return Math.ceil(
      (thisMonth.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
  } else {
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, day);
    return Math.ceil(
      (nextMonth.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );
  }
};
export default function EMI() {
  const { data: emiRecords } = useLiveQuery(
    db
      .select({
        id: emi.id,
        date: emi.date,
        amount: emi.amount,
        name: emi.name,
        accountName: accounts.name,
        accountId: emi.accountId,
      })
      .from(emi)
      .leftJoin(accounts, eq(accounts.id, emi.accountId))
      .where(eq(emi.isActive, true))
      .orderBy(desc(emi.date)),
  );

  return (
    <SafeContainer>
      <EmiProvider>
        <EmiHeader />
        <EmiSummaryCard
          totalMonthly={3}
          emis={[
            { name: "emi 1", id: 1, amount: 10, date: 2, accountId: 1 },
            { name: "emi 2", id: 1, amount: 10, date: 2, accountId: 1 },
            { name: "emi 3", id: 1, amount: 10, date: 2, accountId: 1 },
          ]}
        />
        <FlatList
          data={emiRecords}
          ListHeaderComponent={
            <Text className="text-slate-400 font-semibold text-sm uppercase tracking-widest py-3">
              {"ALL EMI's"}
            </Text>
          }
          renderItem={({ item }) => {
            const days = daysUntil(item.date);
            const isDueToday = item.date === TODAY;
            const isDueSoon = days <= 3 && !TODAY;
            return (
              <EmiCard
                emi={item}
                isDueToday={isDueToday}
                isDueSoon={isDueSoon}
                days={days}
              />
            );
          }}
        />
      </EmiProvider>
    </SafeContainer>
  );
}
