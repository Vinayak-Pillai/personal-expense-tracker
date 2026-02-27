import { db } from "@/db/index";
import { accounts } from "@/db/schema";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

const INIT_ACCOUNT = {
  name: "",
  balance: 0,
  isActive: true,
  isPrimary: false,
};

export default function AddEditAccounts({ onClose }: { onClose?: () => void }) {
  const [accountDetails, setAccountDetails] = useState(INIT_ACCOUNT);

  const handleInputChange = (field: string, value: string) => {
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
            className="bg-stat-card-bg border border-stat-card-border text-white text-base px-4 py-3 rounded-xl"
            placeholder="Account Name"
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
            className="bg-stat-card-bg border border-stat-card-border text-white text-base px-4 py-3 rounded-xl"
            inputMode="numeric"
            placeholder="Current Balance"
            placeholderTextColor="#717182"
            value={accountDetails.balance.toString()}
            onChangeText={(e) => handleInputChange("balance", e)}
          />
        </View>

        {/*<View className="flex-row items-center justify-between mt-2">
          <Text className="text-white text-base font-medium">
            Primary Account
          </Text>
          <Checkbox
            value={accountDetails.isPrimary}
            onValueChange={(value) =>
              setAccountDetails({ ...accountDetails, isPrimary: value })
            }
            color={accountDetails.isPrimary ? "#4f46e5" : "#717182"}
            className="rounded bg-stat-card-bg border-stat-card-border w-5 h-5"
          />
        </View>*/}

        <Pressable
          className="bg-indigo-600 p-4 rounded-xl mt-4 active:opacity-80"
          onPress={handleSave}
        >
          <Text className="text-white text-center font-bold text-lg">
            Save Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
