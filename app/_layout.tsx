import { Stack } from "expo-router";
import "./../global.css";
import { Suspense, useEffect } from "react";
import { Text, View } from "react-native";
import { SQLiteProvider } from "expo-sqlite";
import { db } from "@/db";
import migrations from "../drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { insertCategories } from "@/db/seed";

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
    <Suspense fallback={<Text>Loading...</Text>}>
      <SQLiteProvider databaseName="expense.db" useSuspense>
        <Stack screenOptions={{ headerShown: false }} />
      </SQLiteProvider>
    </Suspense>
  );
}
