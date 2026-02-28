import SafeContainer from "@/components/globals/SafeContainer";
import AddTransactionsHeader from "@/components/add-transactions/add-transactions-header";
import AddTransactionsForm from "@/components/add-transactions/add-transactions-form";

export default function AddExpenses() {
  return (
    <SafeContainer>
      <AddTransactionsHeader />
      <AddTransactionsForm />
    </SafeContainer>
  );
}
