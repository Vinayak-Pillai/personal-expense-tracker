import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const accounts = sqliteTable("accounts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  balance: real("balance").default(0),
  isPrimary: integer("is_primary", { mode: "boolean" }).default(true),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(new Date().toISOString()),
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(new Date().toISOString()),
});

export const transactions = sqliteTable("transactions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  accountId: integer("account_id")
    .notNull()
    .references(() => accounts.id),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  amount: real("amount").notNull(),
  note: text("note"),
  date: text("date").default(new Date().toLocaleDateString("en-IN")),
  createdAt: text("created_at").default(new Date().toISOString()),
});

export type TSelectAccounts = typeof accounts.$inferSelect;
export type TSelectCategories = typeof categories.$inferSelect;
export type TSelectTransactions = typeof transactions.$inferSelect;
