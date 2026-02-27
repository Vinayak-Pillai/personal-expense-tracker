import { db } from "@/db/index";
import { accounts, TSelectAccounts } from "@/db/schema";
import { formatCurrency } from "@/utils/lib";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Wallet } from "../icons/homepage-icons";
import { eq } from "drizzle-orm";

export default function AccountsList() {
  const [accountsRecords, setAccountsRecords] = useState<TSelectAccounts[]>([]);

  const makeAccountPrimary = async (id: number) => {
    await db
      .update(accounts)
      .set({ isPrimary: false })
      .where(eq(accounts.isPrimary, true));
    await db
      .update(accounts)
      .set({ isPrimary: true })
      .where(eq(accounts.id, id));
    setAccountsRecords(await db.select().from(accounts));
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      const records = await db.select().from(accounts);
      console.log({ records });
      setAccountsRecords(records);
    };
    fetchAccounts();
  }, []);
  return (
    <View>
      {accountsRecords.length ? (
        <FlatList
          data={accountsRecords}
          renderItem={({ item }) => (
            <View
              className={`
            p-5 rounded-2xl relative overflow-hidden transition-all
            ${item.isPrimary ? "bg-linear-to-br from-indigo-600 to-violet-800 text-white shadow-xl shadow-indigo-900/40 border border-indigo-400/30" : "bg-slate-900 border border-slate-800 text-slate-300"}
          `}
              // onClick={() => setPrimaryAccount(item.id)}
            >
              <View className="flex flex-row justify-between items-start mb-8">
                <View
                  className={`p-2 rounded-lg ${item.isPrimary ? "bg-white/20" : "bg-slate-800"}`}
                >
                  <Wallet
                    className={`w-6 h-6`}
                    color={item.isPrimary ? "#fff" : "#94A3B8"}
                  />
                </View>
                {item.isPrimary && (
                  <Text className="bg-white/20 px-2 py-1 rounded-full text-[12px] text-white font-bold uppercase tracking-wider backdrop-blur-sm">
                    Primary
                  </Text>
                )}
              </View>

              <View>
                <Text
                  className={`text-sm font-medium mb-1 ${item.isPrimary ? "text-indigo-100" : "text-slate-500"}`}
                >
                  Current Balance
                </Text>
                <Text className="text-3xl font-bold tracking-tight text-white">
                  ₹ {formatCurrency(Number(item.balance))}
                </Text>
                <Text
                  className={`text-sm mt-1 ${item.isPrimary ? "text-indigo-200" : "text-slate-400"}`}
                >
                  {item.name}
                </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <View>
          <Text className="text-center text-gray-500">No accounts found</Text>
        </View>
      )}
    </View>
  );
}
