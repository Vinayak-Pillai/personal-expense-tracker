import EmiHeader from "@/components/emi/emi-header";
import EmiSummaryCard from "@/components/emi/emi-summary-card";
import SafeContainer from "@/components/globals/SafeContainer";

export default function EMI() {
  return (
    <SafeContainer>
      <EmiHeader />
      <EmiSummaryCard
        totalMonthly={3}
        emis={[
          { name: "emi 1", id: 1, amount: 10, date: 2, accountId: 1 },
          { name: "emi 2", id: 1, amount: 10, date: 2, accountId: 1 },
          { name: "emi 3", id: 1, amount: 10, date: 2, accountId: 1 },
        ]}
      />
    </SafeContainer>
  );
}
