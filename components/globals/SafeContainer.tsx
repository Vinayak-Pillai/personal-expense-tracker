import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SafeContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 dark bg-background p-2"
      style={{ flex: 1, paddingTop: insets.top }}
    >
      {children}
    </View>
  );
}
