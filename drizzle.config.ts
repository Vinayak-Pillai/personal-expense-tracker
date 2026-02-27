import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts", // Path to your schema file
  out: "./drizzle", // Path for generated migrations
  dialect: "sqlite",
  driver: "expo", // This tells Drizzle to format SQL for Expo SQLite
});
