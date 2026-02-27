// db/index.ts
import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "./schema"; // We will create this next

// "expense.db" is the file name. openDatabaseSync works instantly in Expo Go.
const expoDb = openDatabaseSync("expense.db");

export const db = drizzle(expoDb, { schema });
