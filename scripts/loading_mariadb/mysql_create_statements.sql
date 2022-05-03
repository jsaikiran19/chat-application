CREATE DATABASE IF NOT EXISTS chats;

use chats;

DROP TABLE IF EXISTS user_id_channels;
DROP TABLE IF EXISTS users_org_details;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_email;
DROP TABLE IF EXISTS org;

# Table to Store org mapping
CREATE TABLE `org` (
  `org_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  PRIMARY KEY (`org_id`),
  UNIQUE KEY `org_name` (`name`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# Table to store hashed password and user mapping
CREATE TABLE `users_email` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `email` text NOT NULL,
  `password` text NOT NULL DEFAULT '$2a$08$dVnj.sN1OOPEWhtNmexzmuCZLodGp1u9r9nLRLAbMVivMGnbKhI2.',
  PRIMARY KEY (`uid`),
  UNIQUE KEY `user_email` (`email`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# Table to store User and Org relations.
CREATE TABLE `users_org_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `org_id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `is_active` int(11) DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_org_details_key` (`org_id`,`uid`),
  KEY `uid` (`uid`),
  CONSTRAINT `users_org_details_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `org` (`org_id`),
  CONSTRAINT `users_org_details_ibfk_2` FOREIGN KEY (`uid`) REFERENCES `users_email` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# Table to store user profile.
CREATE TABLE `users` (
  `uid` int(11) NOT NULL,
  `first_name` text DEFAULT NULL,
  `last_name` text DEFAULT NULL,
  `status` text DEFAULT NULL,
  `profile_picture` blob DEFAULT NULL,
  UNIQUE KEY `users_key` (`uid`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`uid`) REFERENCES `users_email` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

# Table to store channel_id/chats between 2 users.
CREATE TABLE `user_id_channels` (
  `channel_id` int(11) NOT NULL AUTO_INCREMENT,
  `org_id` int(11) NOT NULL,
  `uid_array` text NOT NULL,
  PRIMARY KEY (`channel_id`),
  KEY `user_id_channels_ibfk_1` (`org_id`),
  CONSTRAINT `user_id_channels_ibfk_1` FOREIGN KEY (`org_id`) REFERENCES `org` (`org_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
