/*
 Navicat MySQL Data Transfer

 Source Server         : node-projects
 Source Server Type    : MySQL
 Source Server Version : 80026 (8.0.26-google)
 Source Host           : localhost:9020
 Source Schema         : gare

 Target Server Type    : MySQL
 Target Server Version : 80026 (8.0.26-google)
 File Encoding         : 65001

 Date: 21/06/2023 12:33:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `apikey` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_username` (`username`),
  UNIQUE KEY `idx_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Records of users
-- ----------------------------
BEGIN;
INSERT INTO `users` (`id`, `username`, `password`, `email`, `apikey`) VALUES (2, 'mordecai', '$2b$10$8jWbQDm9GwdtBWZWiGxPTu07gWIQ891rDwnSvdSEw38aTE1nwVVku', 'federico.masci@gmail.com', 'faeIcVrkPa');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
