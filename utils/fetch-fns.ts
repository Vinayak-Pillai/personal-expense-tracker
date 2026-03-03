import { db } from "@/db";
import { accounts, emi } from "@/db/schema";
import { eq } from "drizzle-orm";

export const fetchActiveAccounts = async () => {
  try {
    const records = await db
      .select({
        id: accounts.id,
        name: accounts.name,
        balance: accounts.balance,
        isPrimary: accounts.isPrimary,
      })
      .from(accounts)
      .where(eq(accounts.isActive, true));
    return records;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchEmis = async () => {
  try {
    const records = await db
      .select({
        id: emi.id,
        name: emi.name,
        amount: emi.amount,
        accountId: emi.accountId,
      })
      .from(emi)
      .where(eq(emi.isActive, true));
    return records;
  } catch (error) {
    console.error(error);
    return [];
  }
};
