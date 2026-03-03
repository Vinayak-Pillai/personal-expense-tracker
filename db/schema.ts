import {
  index,
  integer,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

export const accounts = sqliteTable(
  "accounts",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    balance: real("balance").default(0),
    type: text({ enum: ["DEBIT", "CREDIT"] }).default("DEBIT"),
    isPrimary: integer("is_primary", { mode: "boolean" }).default(true),
    isActive: integer("is_active", { mode: "boolean" }).default(true),
    createdAt: text("created_at").default(new Date().toISOString()),
  },
  (table) => {
    return {
      typeIdx: index("type_idx").on(table.type),
      isPrimaryIdx: index("is_primary_idx").on(table.isPrimary),
    };
  },
);

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(new Date().toISOString()),
});

export const transactions = sqliteTable(
  "transactions",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    type: integer("type").notNull(),
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
  },
  (table) => {
    return {
      accountIdIdx: index("account_id_idx").on(table.accountId),
      categoryIdIdx: index("category_id_idx").on(table.categoryId),
    };
  },
);

export const emi = sqliteTable("emi", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  amount: real("amount").notNull(),
  date: real("date").notNull(),
  accountId: integer("account_id")
    .notNull()
    .references(() => accounts.id),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  createdAt: text("created_at").default(new Date().toISOString()),
});

export type TSelectAccounts = typeof accounts.$inferSelect;
export type TAddAccounts = typeof accounts.$inferInsert;
export type TSelectCategories = typeof categories.$inferSelect;
export type TSelectTransactions = typeof transactions.$inferSelect;
export type TAddEmi = typeof emi.$inferInsert;
export type TSelectEmi = Omit<
  typeof emi.$inferSelect,
  "createdAt" | "isActive"
>;
