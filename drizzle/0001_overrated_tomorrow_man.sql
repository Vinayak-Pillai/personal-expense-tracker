CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`is_active` integer DEFAULT true,
	`created_at` text DEFAULT '2026-02-28T09:47:45.497Z'
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`balance` real DEFAULT 0,
	`is_primary` integer DEFAULT true,
	`is_active` integer DEFAULT true,
	`created_at` text DEFAULT '2026-02-28T09:47:45.496Z'
);
--> statement-breakpoint
INSERT INTO `__new_accounts`("id", "name", "balance", "is_primary", "is_active", "created_at") SELECT "id", "name", "balance", "is_primary", "is_active", "created_at" FROM `accounts`;--> statement-breakpoint
DROP TABLE `accounts`;--> statement-breakpoint
ALTER TABLE `__new_accounts` RENAME TO `accounts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;