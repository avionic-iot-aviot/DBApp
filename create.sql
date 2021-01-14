CREATE TABLE `Devices` (
    `Device_id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `Mac` varchar(30) NOT NULL,
    `Default_Name` varchar(50) NOT NULL,
    `Current_Name` varchar(50) NOT NULL,
    `Created_at` varchar(20) NOT NULL,
    `Updated_at` varchar(20) NOT NULL
);