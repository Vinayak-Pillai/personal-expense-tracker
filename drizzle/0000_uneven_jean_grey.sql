CREATE TABLE `accounts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`balance` real DEFAULT 0,
	`is_primary` integer DEFAULT true,
	`is_active` integer DEFAULT true,
	`created_at` text DEFAULT '2026-02-27T18:57:03.691Z'
);
