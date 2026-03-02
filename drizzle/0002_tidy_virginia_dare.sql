CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`type` integer NOT NULL,
	`account_id` integer NOT NULL,
	`category_id` integer NOT NULL,
	`amount` real NOT NULL,
	`note` text,
	`date` text DEFAULT '3/3/2026',
	`created_at` text DEFAULT '2026-03-02T18:33:39.459Z',
	FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`balance` real DEFAULT 0,
	`is_primary` integer DEFAULT true,
	`is_active` integer DEFAULT true,
	`created_at` text DEFAULT '2026-03-02T18:33:39.447Z'
);
--> statement-breakpoint
INSERT INTO `__new_accounts`("id", "name", "balance", "is_primary", "is_active", "created_at") SELECT "id", "name", "balance", "is_primary", "is_active", "created_at" FROM `accounts`;--> statement-breakpoint
DROP TABLE `accounts`;--> statement-breakpoint
ALTER TABLE `__new_accounts` RENAME TO `accounts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`is_active` integer DEFAULT true,
	`created_at` text DEFAULT '2026-03-02T18:33:39.448Z'
);
--> statement-breakpoint
INSERT INTO `__new_categories`("id", "name", "is_active", "created_at") SELECT "id", "name", "is_active", "created_at" FROM `categories`;--> statement-breakpoint
DROP TABLE `categories`;--> statement-breakpoint
ALTER TABLE `__new_categories` RENAME TO `categories`;