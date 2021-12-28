-- DATABASE
CREATE DATABASE users_db;

-- TABLES
-- Users
CREATE TABLE `users` (
   `id` int NOT NULL AUTO_INCREMENT,
   `username` varchar(255) NOT NULL,
   `user_name` varchar(255) NOT NULL,
   `user_surname` varchar(255) NOT NULL,
   `user_password` varchar(255) NOT NULL,
   `user_email` varchar(255) NOT NULL,
   `user_type` enum('admin','user') DEFAULT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `username` (`username`),
   UNIQUE KEY `user_email` (`user_email`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert admin user
INSERT INTO `users` (`username`, `user_name`, `user_surname`, `user_password`, `user_email`, `user_type`) 
VALUES ('admin', 'Admin', 'Admin', 'f703a7bd3fd781b4b8314ad13996a6fb15c650e7f4376df99c279684ffa93282', 'admin@mail.com', 'admin');

-- Tokens
CREATE TABLE `tokens` (
   `id` int NOT NULL AUTO_INCREMENT,
   `user_id` int NOT NULL,
   `token` varchar(255) NOT NULL,
   `expires` datetime NOT NULL,
   `createdAt` datetime NOT NULL,
   `time_to_live` varchar(255) NOT NULL,
   `user_ip` varchar(255) NOT NULL,
   `source_url` varchar(255) NOT NULL,
   PRIMARY KEY (`id`)
);
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Logs
CREATE TABLE `logs` (
   `id` int NOT NULL AUTO_INCREMENT,
   `log` varchar(255) NOT NULL,
   PRIMARY KEY (`id`)
)
ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- STORED PROCEDURES
-- Create User
CREATE DEFINER=`root`@`localhost` PROCEDURE `createUser`(
    IN _username VARCHAR(45),
    IN _user_name VARCHAR(45),
    IN _user_surname VARCHAR(45),
    IN _user_password VARCHAR(400),
    IN _user_email VARCHAR(45),
    IN _user_type VARCHAR(45)
)
BEGIN
    INSERT INTO users(username, user_name, user_surname, user_password, user_email, user_type)
    VALUES (_username, _user_name, _user_surname, _user_password, _user_email, _user_type);
    SELECT * FROM users WHERE username=_username;
END

-- Get List of Users
CREATE DEFINER=`root`@`localhost` PROCEDURE `getListOfUsers`()
BEGIN
SELECT * FROM users;
END

-- Get User Info
CREATE DEFINER=`root`@`localhost` PROCEDURE `getUserInfo`(
	IN _user_id INT
)
BEGIN
SELECT * FROM users WHERE id=_user_id;
END

-- Update User
CREATE DEFINER=`root`@`localhost` PROCEDURE `updateUser`(
    IN _user_id INT,
    IN _username VARCHAR(45),
    IN _user_name VARCHAR(45),
    IN _user_surname VARCHAR(45),
    IN _user_password VARCHAR(400),
    IN _user_email VARCHAR(45),
    IN _user_type VARCHAR(45)
)
BEGIN
UPDATE users
SET
username=_username,
user_name=_user_name,
user_surname=_user_surname,
user_password=_user_password,
user_email=_user_email,
user_type=_user_type
WHERE id=_user_id;
SELECT * FROM users WHERE id=_user_id;
END

-- Delete User
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteUser`(
	IN _user_id INT
)
BEGIN
DELETE FROM users WHERE id=_user_id;
END