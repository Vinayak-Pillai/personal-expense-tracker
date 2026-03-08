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
                     ${isSelected ? "bg-indigo-600 border-indigo-500 text-foreground" : "bg-card border-slate-800 text-muted-foreground"}
                   `}
    >
      <Text
        className={`font-semibold ${isSelected ? "text-foreground" : "text-muted-foreground"}`}
      >
        {category.name}
      </Text>
    </View>
  );
}

export default memo(CategoriesCard);
