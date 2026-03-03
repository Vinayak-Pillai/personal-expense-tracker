import { db } from "@/db/index";
import { accounts, TAddAccounts } from "@/db/schema";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const INIT_ACCOUNT: TAddAccounts = {
  name: "",
  balance: 0,
  type: "DEBIT",
  isActive: true,
  isPrimary: false,
};

export default function AddEditAccounts({ onClose }: { onClose?: () => void }) {
  const [accountDetails, setAccountDetails] =
    useState<TAddAccounts>(INIT_ACCOUNT);

  const handleInputChange = <K extends keyof TAddAccounts>(
    field: K,
    value: TAddAccounts[K],
  ) => {
    setAccountDetails({ ...accountDetails, [field]: value });
  };

  const handleSave = async () => {
    // Save account logic
    console.log("Account details:", accountDetails);
    await db.insert(accounts).values({
      ...accountDetails,
      balance: Number(accountDetails.balance),
      isPrimary: false,
    });
    if (onClose) onClose();
  };

  return (
    <View className="flex-1 justify-end bg-black/50">
      <Pressable className="flex-1" onPress={onClose} />
      <View className="bg-background w-full rounded-t-3xl p-6 pb-12 gap-4">
        <View className="w-12 h-1.5 bg-stat-card-muted/30 rounded-full self-center mb-2" />
        <Text className="text-2xl font-bold text-white mb-2">
          Add/Edit Accounts
        </Text>

        <View className="flex-col gap-2">
          <Text className="text-stat-card-muted text-sm font-medium">
            Account Name
          </Text>
          <TextInput
            className="bg-stat-card-bg border border-stat-card-border text-white text-base px-4 py-3 rounded-lg"
            placeholder="Savings Account"
            placeholderTextColor="#717182"
            value={accountDetails.name}
            onChangeText={(e) => handleInputChange("name", e)}
          />
        </View>

        <View className="flex-col gap-2">
          <Text className="text-stat-card-muted text-sm font-medium">
            Current Balance
          </Text>
          <TextInput
            className="bg-stat-card-bg border border-stat-card-border text-white text-base px-4 py-3 rounded-lg"
            inputMode="numeric"
            placeholder="Current Balance"
            placeholderTextColor="#717182"
            value={String(accountDetails.balance)}
            onChangeText={(e) => handleInputChange("balance", Number(e))}
          />
        </View>

        <View className="flex-col gap-2">
          <Text className="text-stat-card-muted text-sm font-medium">
            Account Type
          </Text>
          <View className="flex flex-row gap-2">
            <TouchableOpacity
              onPress={() => handleInputChange("type", "CREDIT")}
              className={`rounded-lg px-5 py-2
            ${accountDetails.type === "CREDIT" ? "bg-linear-to-br from-indigo-600 to-violet-800 text-white shadow-lg shadow-indigo-900/40 border border-indigo-400/30" : "bg-slate-900 border border-slate-800 text-slate-300"}
            `}
            >
              <Text className="w-full text-slate-200">CREDIT</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleInputChange("type", "DEBIT")}
              className={`rounded-lg px-5 py-2
          ${accountDetails.type === "DEBIT" ? "bg-linear-to-br from-indigo-600 to-violet-800 text-white shadow-lg shadow-indigo-900/40 border border-indigo-400/30" : "bg-slate-900 border border-slate-800 text-slate-300"}
          `}
            >
              <Text className="w-full text-slate-200">DEBIT</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          className="bg-indigo-600 p-4 rounded-lg mt-4 active:opacity-80"
          onPress={handleSave}
        >
          <Text className="text-white text-center font-bold text-lg">
            Save Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
