import { db } from "@/db";
import {
  categories as Category,
  TSelectAccounts,
  TSelectCategories,
} from "@/db/schema";
import { fetchActiveAccounts } from "@/utils/fetch-fns";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import { Calendar } from "../icons/add-transactions-icons";
import AddCategoryCard from "./add-category-card";
import CategoriesCard from "./categories-card";

const TYPES = [
  {
    id: 1,
    name: "Expense",
    styling: "bg-rose-600 text-white shadow-lg shadow-rose-900/40",
  },
  {
    id: 2,
    name: "Income",
    styling: "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40",
  },
];

type TFormValues = {
  type: number;
  amount: number | null;
  categoryId: number | undefined;
  accountId: number | undefined;
  date: Date;
  note: string;
};

export default function AddTransactionsForm() {
  const [categories, setCategories] = useState<
    Omit<TSelectCategories, "isActive" | "createdAt">[]
  >([]);
  const [selectedAccountId, setSelectedAccountId] = useState<
    number | undefined
  >(undefined);
  const [accounts, setAccounts] = useState<
    Omit<TSelectAccounts, "isActive" | "createdAt">[]
  >([]);
  const [isDateVisible, setIsDateVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState<TFormValues>({
    type: 1,
    amount: null,
    categoryId: undefined,
    accountId: undefined,
    date: new Date(),
    note: "",
  });

  const handleSelectedDate = (date: Date | undefined) => {
    if (!date) return;
    setIsDateVisible(false);
    handleFormChange("date", date);
  };

  const handleFormChange = <K extends keyof TFormValues>(
    field: K,
    value: TFormValues[K],
  ) => {
    console.log({ field, value });
    setSelectedValues((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const records = await db
        .select({ id: Category.id, name: Category.name })
        .from(Category)
        .where(eq(Category.isActive, true));

      console.log({ categories: records });
      if (!records.length) return;
      setCategories(records);
    };
    fetchCategories();
    fetchActiveAccounts().then((response) => {
      console.log({ response });
      setAccounts(response);
      const primaryAccount = response.find((account) => account.isPrimary);
      setSelectedAccountId(primaryAccount?.id);
    });
  }, []);

  return (
    <View className="flex-1 p-4 space-y-6">
      <View className="bg-slate-900 p-1 mb-6 rounded-lg flex-row w-full">
        {TYPES.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => handleFormChange("type", item.id)}
            className={`flex-1 py-3 rounded-lg items-center justify-center will-change-variable ${
              selectedValues.type === item.id
                ? item.styling
                : "hover:bg-slate-800"
            }`}
          >
            <Text
              className={`text-sm font-semibold will-change-variable ${
                selectedValues.type === item.id
                  ? "text-white"
                  : "text-slate-400"
              }`}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-col items-center gap-2 mb-6">
        <Text className="text-slate-500 text-2xl font-bold align-top mt-2 inline-block">
          ₹
        </Text>
        <TextInput
          className="bg-transparent text-5xl  text-white"
          inputMode="numeric"
          placeholder="0.00"
          placeholderTextColor="#717182"
          value={
            selectedValues.amount && isNaN(selectedValues.amount)
              ? "0"
              : selectedValues.amount?.toString() || ""
          }
          onChangeText={(e) => handleFormChange("amount", Number(e))}
        />
      </View>

      <View className="mb-6">
        <View className="mb-2">
          <Text className="text-sm font-semibold text-slate-400 ml-1 mb-2 uppercase tracking-wider">
            Category
          </Text>
          <FlatList
            data={categories}
            horizontal
            ListFooterComponent={AddCategoryCard}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() => handleFormChange("categoryId", item.id)}
                >
                  <CategoriesCard
                    category={item}
                    isSelected={selectedValues.categoryId === item.id}
                  />
                </Pressable>
              );
            }}
          />
        </View>
      </View>

      {/*Account*/}
      <View className="mb-6">
        <Text className="text-sm font-semibold text-slate-400 ml-1 uppercase tracking-wider">
          Account
        </Text>
        <View className="bg-slate-900 rounded-lg mt-2 justify-center h-14">
          <Picker
            selectedValue={selectedAccountId}
            onValueChange={(itemValue) =>
              handleFormChange("accountId", itemValue)
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

      <View className="flex flex-row gap-4 mb-6 w-full">
        <View className="flex-1 my-2">
          <Text className="text-sm font-semibold text-slate-400 ml-1 uppercase tracking-wider">
            Date
          </Text>
          <View className="relative mt-2">
            <Pressable
              className="bg-slate-900 rounded-lg justify-center h-14 px-4"
              onPress={() => setIsDateVisible(true)}
            >
              <Text className="text-white">
                {selectedValues.date.toLocaleDateString("en-IN")}
              </Text>
            </Pressable>
            <View className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Calendar className="w-5 h-5 text-slate-500" color="#94a3b8" />
            </View>
            {isDateVisible && (
              <DateTimePicker
                value={selectedValues.date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) =>
                  handleSelectedDate(selectedDate)
                }
              />
            )}
          </View>
        </View>
        <View className="flex-1 my-2">
          <Text className="text-sm font-semibold text-slate-400 ml-1 uppercase tracking-wider">
            Note
          </Text>
          <TextInput
            className="w-full bg-slate-900 text-white px-4 rounded-lg mt-2 h-14"
            placeholder="Description"
            placeholderTextColor="#94a3b8"
            value={selectedValues.note}
            onChangeText={(e) => handleFormChange("note", e)}
          />
        </View>
      </View>

      <Pressable
        disabled={!selectedValues.amount || !selectedValues.categoryId}
        className={`mt-auto w-full py-4 rounded-lg font-bold text-white shadow-lg flex items-center justify-center gap-2 mt-8 will-change-auto
                 ${!selectedValues.amount || !selectedValues.categoryId ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-900/50"}`}
      >
        <Text
          className={`${!selectedValues.amount || !selectedValues.categoryId ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/50"}`}
        >
          Save Transaction
        </Text>
      </Pressable>
    </View>
  );
}
