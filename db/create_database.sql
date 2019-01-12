-- This script has only tested in SQLite!

-- DROP

DROP TABLE `TASK`;
DROP TABLE `OPTIONS`;

-- CREATE TABLE

CREATE TABLE `TASK` (
	`code`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	`name`	TEXT NOT NULL,
	`description`	TEXT NOT NULL,
	`deadline_date`	TEXT NOT NULL,
	`deadline_time`	TEXT NOT NULL,
	`urgent`	TEXT NOT NULL,
	`important`	TEXT NOT NULL,
	`task_state`	INTEGER NOT NULL
);

CREATE TABLE `OPTIONS` (
	`option_name`	TEXT NOT NULL,
	`option_value`	TEXT NOT NULL,
	PRIMARY KEY(`option_name`)
);