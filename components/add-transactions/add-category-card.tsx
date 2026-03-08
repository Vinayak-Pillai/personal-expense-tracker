import { Text, View } from "react-native";
import { CirclePlus } from "../icons/footer-icons";

export default function AddCategoryCard() {
  return (
    <View
      // add transition-all
      className={`w-40 h-20 p-3 rounded-lg mr-3 border flex flex-col items-center justify-center gap-2 bg-card border-slate-800 text-muted-foreground}
                 `}
    >
      <Text className="text-muted-foreground">
        <CirclePlus color="#94A3B8" />
      </Text>
    </View>
  );
}
