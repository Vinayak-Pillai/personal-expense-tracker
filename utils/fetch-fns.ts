import { db } from "@/db";
import { accounts } from "@/db/schema";
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
