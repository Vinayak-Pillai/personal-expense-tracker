import { Text, View } from "react-native";
import { CirclePlus } from "../icons/footer-icons";

export default function AddCategoryCard() {
  return (
    <View
      // add transition-all
      className={`w-40 h-20 p-3 rounded-lg mr-3 border flex flex-col items-center justify-center gap-2 bg-slate-900 border-slate-800 text-slate-400}
                 `}
    >
      <Text className="text-slate-400">
        <CirclePlus color="#94A3B8" />
      </Text>
    </View>
  );
}
