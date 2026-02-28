import { TSelectCategories } from "@/db/schema";
import { memo } from "react";
import { Text, View } from "react-native";

function CategoriesCard({
  category,
  isSelected,
}: {
  category: Omit<TSelectCategories, "isActive" | "createdAt">;
  isSelected: boolean;
}) {
  return (
    <View
      // add transition-all
      className={`w-40 h-20 p-3 rounded-lg mr-3 border flex flex-col items-center justify-center gap-2 will-change-variable
                     ${isSelected ? "bg-indigo-600 border-indigo-500 text-white" : "bg-slate-900 border-slate-800 text-slate-400"}
                   `}
    >
      <Text
        className={`font-semibold ${isSelected ? "text-white" : "text-slate-400"}`}
      >
        {category.name}
      </Text>
    </View>
  );
}

export default memo(CategoriesCard);
