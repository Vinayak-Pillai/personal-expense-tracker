PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`balance` real DEFAULT 0,
	`type` text,
	`is_primary` integer DEFAULT true,
	`is_active` integer DEFAULT true,
	`created_at` text DEFAULT '2026-03-03T09:04:05.790Z'
);
--> statement-breakpoint
INSERT INTO `__new_accounts`("id", "name", "balance", "type", "is_primary", "is_active", "created_at") SELECT "id", "name", "balance", "type", "is_primary", "is_active", "created_at" FROM `accounts`;--> statement-breakpoint
DROP TABLE `accounts`;--> statement-breakpoint
ALTER TABLE `__new_accounts` RENAME TO `accounts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`is_active` integer DEFAULT true,
	`created_at` text DEFAULT '2026-03-03T09:04:05.791Z'
);
--> statement-breakpoint
INSERT INTO `__new_categories`("id", "name", "is_active", "created_at") SELECT "id", "name", "is_active", "created_at" FROM `categories`;--> statement-breakpoint
DROP TABLE `categories`;--> statement-breakpoint
ALTER TABLE `__new_categories` RENAME TO `categories`;--> statement-breakpoint
CREATE TABLE `__new_transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` integer NOT NULL,
	`account_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	`amount` real NOT NULL,
	`note` text,
	`date` text DEFAULT '3/3/2026',
	`created_at` text DEFAULT '2026-03-03T09:04:05.805Z',
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_transactions`("id", "type", "account_id", "category_id", "amount", "note", "date", "created_at") SELECT "id", "type", "account_id", "category_id", "amount", "note", "date", "created_at" FROM `transactions`;--> statement-breakpoint
DROP TABLE `transactions`;--> statement-breakpoint
ALTER TABLE `__new_transactions` RENAME TO `transactions`;