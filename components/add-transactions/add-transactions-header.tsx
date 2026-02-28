import { ChevronLeft } from "@components/icons/add-transactions-icons";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function AddTransactionsHeader() {
  const router = useRouter();
  return (
    <View className="p-4 flex flex-row items-center justify-between border-b border-border z-10 w-full pb-6">
      <Pressable
        onPress={() => router.back()}
        className="p-2 rounded-full hover:bg-slate-800"
      >
        <ChevronLeft color="white" />
      </Pressable>
      <Text className="text-lg font-semibold text-white">
        New Transaction
      </Text>
      <View className="w-10" />
    </View>
  );
}
