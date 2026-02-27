import AccountsHeader from "@/components/accounts/accounts-header";
import AccountsList from "@/components/accounts/accounts-list";
import SafeContainer from "@/components/globals/SafeContainer";

export default function Accounts() {
  return (
    <SafeContainer>
      <AccountsHeader />
      <AccountsList />
    </SafeContainer>
  );
}
