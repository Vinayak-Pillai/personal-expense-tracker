import { Pressable, Text, View } from "react-native";
import { CirclePlus } from "../icons/footer-icons";
import { useEmi } from "./emi-context";

export default function EmiHeader() {
  const { handleEditEmi } = useEmi();
  return (
    <View className="p-4 pt-2">
      <View className="flex flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-foreground">EMI Tracker</Text>
        <Pressable
          className="bg-indigo-600 p-2 rounded-full text-foreground"
          onPress={handleEditEmi}
        >
          <CirclePlus color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}
