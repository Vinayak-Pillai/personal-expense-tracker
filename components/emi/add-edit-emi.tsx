import { TSelectAccounts } from "@/db/schema";
import { fetchActiveAccounts } from "@/utils/fetch-fns";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useEmi } from "./emi-context";

type TFormValues = {
  name: string;
  amount: number;
  accountId: number;
  date: number;
};
export default function AddEditEmi({ onClose }: { onClose: () => void }) {
  const { isEditingEmi, currentEditEmi, saveEmi } = useEmi();
  const [accounts, setAccounts] = useState<
    Omit<TSelectAccounts, "isActive" | "createdAt" | "type">[]
  >([]);
  const [emiDetails, setEmiDetails] = useState<TFormValues>({
    name: currentEditEmi?.name || "",
    amount: currentEditEmi?.amount || 0,
    date: currentEditEmi?.date || 1,
    accountId: currentEditEmi?.accountId || 0,
  });

  const handleInputChange = <K extends keyof TFormValues>(
    field: K,
    value: TFormValues[K],
  ) => {
    setEmiDetails({ ...emiDetails, [field]: value });
  };

  const handleSave = async () => {
    if (!emiDetails.name.trim() || !emiDetails.amount || !emiDetails.accountId || !emiDetails.date) return;
    try {
      await saveEmi(
        {
          ...emiDetails,
          ...(currentEditEmi?.id && { id: currentEditEmi?.id }),
        },
        currentEditEmi?.id ? "edit" : "add",
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchActiveAccounts().then((accountsResponse) => {
      setAccounts(accountsResponse);
      const primaryAccount = accountsResponse.find(
        (account) => account.isPrimary,
      );
      if (primaryAccount?.id) {
        setEmiDetails((prev) => ({ ...prev, accountId: primaryAccount.id }));
      }
    });
  }, []);
  return (
    <View className="flex-1 justify-end bg-black">
      <View className="w-full bg-card border border-slate-700 rounded-t-3xl p-6 pb-10 shadow-2xl">
        <View className="flex items-start justify-between mb-6">
          <Text className="text-lg font-bold text-foreground">
            {isEditingEmi ? "Edit EMI" : "Add New EMI"}
          </Text>
          <Pressable className="flex-1" onPress={onClose} />
        </View>

        {/*add/edit form*/}
        <View className="flex-col gap-2 mb-3">
          <Text className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
            EMI NAME
          </Text>
          <TextInput
            className="w-full bg-secondary border rounded-lg px-4 py-3 text-foreground placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500
                                border-slate-700"
            placeholder="e.g. Home Loan, Car Loan…"
            placeholderTextColor="#717182"
            value={emiDetails.name}
            onChangeText={(e) => handleInputChange("name", e)}
          />
        </View>

        <View className="flex-col gap-2 mb-3">
          <Text className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
            Monthly Amount
          </Text>
          <TextInput
            inputMode="numeric"
            className="w-full bg-secondary border rounded-lg px-4 py-3 text-foreground placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500
                                border-slate-700"
            placeholder="0.00"
            placeholderTextColor="#717182"
            value={emiDetails.amount ? String(emiDetails.amount) : ""}
            onChangeText={(e) => {
              const val = Number(e);
              if (e === "" || !isNaN(val)) {
                handleInputChange("amount", e === "" ? 0 : val);
              }
            }}
          />
        </View>

        <View className="flex-col gap-2 mb-3">
          <Text className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
            Date of deduction
          </Text>
          <TextInput
            inputMode="numeric"
            className="w-full bg-secondary border rounded-lg px-4 py-3 text-foreground placeholder-slate-600 outline-none focus:ring-2 focus:ring-indigo-500
                                border-slate-700"
            placeholder="Number b/w 1-31"
            maxLength={2}
            placeholderTextColor="#717182"
            value={emiDetails.date ? String(emiDetails.date) : ""}
            onChangeText={(e) => {
              const val = Number(e);
              if (e === "" || (val >= 1 && val <= 31)) {
                handleInputChange("date", e === "" ? 0 : val);
              }
            }}
          />
        </View>

        <View className="mb-6">
          <Text className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
            Account
          </Text>
          <View className="w-full border border-slate-700 bg-secondary rounded-lg px-4  text-foreground placeholder-slate-600">
            <Picker
              selectedValue={emiDetails.accountId}
              onValueChange={(itemValue) =>
                handleInputChange("accountId", itemValue)
              }
              style={{ color: "white" }}
              dropdownIconColor="#94a3b8"
            >
              <Picker.Item
                label="Select an account"
                value={undefined}
                color="gray"
              />
              {accounts.map((account) => (
                <Picker.Item
                  key={account.id}
                  value={account.id}
                  label={account.name}
                />
              ))}
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          className="bg-indigo-600 p-4 rounded-lg mt-4 active:opacity-80"
          onPress={handleSave}
        >
          <Text className="text-foreground text-center font-bold text-lg">
            {isEditingEmi ? "Save Changes" : "Add EMI"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
