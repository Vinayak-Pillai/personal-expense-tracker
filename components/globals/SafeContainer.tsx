import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme/theme-context";

export default function SafeContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View
      className={`flex-1 bg-background p-2 ${theme === 'dark' ? 'dark' : ''}`}
      style={{ flex: 1, paddingTop: insets.top }}
    >
      {children}
    </View>
  );
}
