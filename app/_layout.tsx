import { ThemeProvider } from "@/components/theme/theme-context";
import { db } from "@/db";
import { insertCategories } from "@/db/seed";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect } from "react";
import { Text } from "react-native";
import migrations from "../drizzle/migrations";
import "./../global.css";

export default function RootLayout() {
  const { success, error } = useMigrations(db, migrations);
  // if (error) {
  //   return (
  //     <View>
  //       <Text>Migration error: {error.message}</Text>
  //     </View>
  //   );
  // }

  // if (!success) {
  //   return (
  //     <View>
  //       <Text>Setting up database...</Text>
  //     </View>
  //   );
  // }

  useEffect(() => {
    if (error) return;
    if (!success) console.log("Database setup loading");
    if (success) {
      insertCategories().then();
    }
  }, [success, error]);
  return (
    <ThemeProvider>
      <Suspense fallback={<Text>Loading...</Text>}>
        <SQLiteProvider databaseName="expense.db" useSuspense>
          <Stack screenOptions={{ headerShown: false }} />
        </SQLiteProvider>
      </Suspense>
    </ThemeProvider>
  );
}
