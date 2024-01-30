-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.27 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour ecom_literiedamour
DROP DATABASE IF EXISTS `ecom_literiedamour`;
CREATE DATABASE IF NOT EXISTS `ecom_literiedamour` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecom_literiedamour`;

-- Listage de la structure de la table ecom_literiedamour. abonnement
DROP TABLE IF EXISTS `abonnement`;
CREATE TABLE IF NOT EXISTS `abonnement` (
  `abonnement_id` int NOT NULL AUTO_INCREMENT,
  `abonnement_ref` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `abonnement_dateb` date DEFAULT NULL,
  `abonnement_datee` date DEFAULT NULL,
  `abonnement_price` decimal(15,3) DEFAULT NULL,
  `shop_id` int NOT NULL,
  PRIMARY KEY (`abonnement_id`),
  KEY `abonnement_shop_FK` (`shop_id`),
  CONSTRAINT `abonnement_shop_FK` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.abonnement : ~0 rows (environ)
DELETE FROM `abonnement`;

-- Listage de la structure de la table ecom_literiedamour. ads
DROP TABLE IF EXISTS `ads`;
CREATE TABLE IF NOT EXISTS `ads` (
  `ads_id` int NOT NULL AUTO_INCREMENT,
  `ads_ord` int DEFAULT NULL,
  `ads_positive` int DEFAULT NULL,
  `ads_negative` int DEFAULT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`ads_id`),
  KEY `ads_product_FK` (`product_id`),
  CONSTRAINT `ads_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.ads : ~0 rows (environ)
DELETE FROM `ads`;

-- Listage de la structure de la table ecom_literiedamour. brand
DROP TABLE IF EXISTS `brand`;
CREATE TABLE IF NOT EXISTS `brand` (
  `brand_id` int NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `brand_pic` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.brand : ~2 rows (environ)
DELETE FROM `brand`;
INSERT INTO `brand` (`brand_id`, `brand_name`, `brand_pic`) VALUES
	(1, 'Iphone', NULL),
	(2, 'Samsung', NULL);

-- Listage de la structure de la table ecom_literiedamour. cart
DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `cart_ref` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cart_date` datetime DEFAULT NULL,
  `cart_status` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`cart_id`),
  UNIQUE KEY `cart_user_AK` (`user_id`),
  CONSTRAINT `cart_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.cart : ~6 rows (environ)
DELETE FROM `cart`;
INSERT INTO `cart` (`cart_id`, `cart_ref`, `cart_date`, `cart_status`, `user_id`) VALUES
	(1, NULL, '2023-12-12 14:42:17', 1, 4),
	(2, NULL, '2023-12-20 13:43:39', 1, 5),
	(3, NULL, '2024-01-28 11:49:25', 1, 6),
	(4, NULL, '2024-01-30 11:52:56', 1, 7),
	(5, NULL, '2024-01-30 11:57:30', 1, 8),
	(6, NULL, '2024-01-30 13:51:01', 1, 9);

-- Listage de la structure de la table ecom_literiedamour. cart_p
DROP TABLE IF EXISTS `cart_p`;
CREATE TABLE IF NOT EXISTS `cart_p` (
  `product_id` int NOT NULL,
  `cart_id` int NOT NULL,
  `product_qt_c` int DEFAULT NULL,
  `product_price_c` decimal(15,3) DEFAULT NULL,
  `product_info1_c` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_info2_c` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`product_id`,`cart_id`),
  KEY `cart_p_cart0_FK` (`cart_id`),
  CONSTRAINT `cart_p_cart0_FK` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`),
  CONSTRAINT `cart_p_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.cart_p : ~2 rows (environ)
DELETE FROM `cart_p`;
INSERT INTO `cart_p` (`product_id`, `cart_id`, `product_qt_c`, `product_price_c`, `product_info1_c`, `product_info2_c`) VALUES
	(56, 2, 1, 5700.000, NULL, NULL),
	(58, 2, 1, 5000.000, NULL, NULL);

-- Listage de la structure de la table ecom_literiedamour. category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `cat_id` int NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cat_pic` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.category : ~0 rows (environ)
DELETE FROM `category`;
INSERT INTO `category` (`cat_id`, `cat_name`, `cat_pic`) VALUES
	(1, 'Ipa', NULL);

-- Listage de la structure de la table ecom_literiedamour. customer_order
DROP TABLE IF EXISTS `customer_order`;
CREATE TABLE IF NOT EXISTS `customer_order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_ref` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `order_status` int DEFAULT NULL,
  `order_total_price` decimal(15,3) NOT NULL,
  `order_imgdir` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_id` int NOT NULL,
  `delivery_type_id` int DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `customer_order_user_FK` (`user_id`),
  KEY `delivery_type_id` (`delivery_type_id`),
  CONSTRAINT `customer_order_ibfk_1` FOREIGN KEY (`delivery_type_id`) REFERENCES `delivery_type` (`delivery_type_id`),
  CONSTRAINT `customer_order_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.customer_order : ~6 rows (environ)
DELETE FROM `customer_order`;
INSERT INTO `customer_order` (`order_id`, `order_ref`, `order_date`, `order_status`, `order_total_price`, `order_imgdir`, `user_id`, `delivery_type_id`) VALUES
	(1, NULL, '2023-12-11 13:06:48', 1, 5000.000, NULL, 3, 1),
	(2, NULL, '2023-12-20 14:45:39', 1, 5000.000, NULL, 5, 1),
	(3, '2024-00001', '2024-01-28 12:49:38', 1, 23000.000, NULL, 6, 1),
	(4, '2024-00002', '2024-01-30 13:06:28', 1, 803700.000, NULL, 7, 1),
	(5, '2024-00003', '2024-01-30 13:36:38', 1, 23000.000, NULL, 8, 1),
	(6, '2024-00004', '2024-01-30 14:51:37', 1, 58700.000, NULL, 9, 1);

-- Listage de la structure de la table ecom_literiedamour. delivery_price
DROP TABLE IF EXISTS `delivery_price`;
CREATE TABLE IF NOT EXISTS `delivery_price` (
  `wilaya_id` int NOT NULL,
  `shop_id` int NOT NULL,
  `delivery_price` decimal(15,3) DEFAULT NULL,
  `delivery_type_id` int DEFAULT NULL,
  KEY `delivery_price_shop0_FK` (`shop_id`),
  KEY `wilaya_id` (`wilaya_id`),
  KEY `delivery_type_id` (`delivery_type_id`),
  CONSTRAINT `delivery_price_ibfk_1` FOREIGN KEY (`wilaya_id`) REFERENCES `wilaya` (`wilaya_id`),
  CONSTRAINT `delivery_price_ibfk_2` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`),
  CONSTRAINT `delivery_price_ibfk_3` FOREIGN KEY (`delivery_type_id`) REFERENCES `delivery_type` (`delivery_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.delivery_price : ~0 rows (environ)
DELETE FROM `delivery_price`;

-- Listage de la structure de la table ecom_literiedamour. delivery_type
DROP TABLE IF EXISTS `delivery_type`;
CREATE TABLE IF NOT EXISTS `delivery_type` (
  `delivery_type_id` int NOT NULL AUTO_INCREMENT,
  `delivery_type_name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`delivery_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.delivery_type : ~2 rows (environ)
DELETE FROM `delivery_type`;
INSERT INTO `delivery_type` (`delivery_type_id`, `delivery_type_name`) VALUES
	(1, 'A domicile'),
	(2, 'Point de relais');

-- Listage de la structure de la table ecom_literiedamour. details
DROP TABLE IF EXISTS `details`;
CREATE TABLE IF NOT EXISTS `details` (
  `detail_id` int NOT NULL AUTO_INCREMENT,
  `detail_name` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `detail_ref` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sub_cat_id` int DEFAULT NULL,
  PRIMARY KEY (`detail_id`),
  KEY `FK_details_sub_category` (`sub_cat_id`),
  CONSTRAINT `FK_details_sub_category` FOREIGN KEY (`sub_cat_id`) REFERENCES `sub_category` (`sub_cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.details : ~3 rows (environ)
DELETE FROM `details`;
INSERT INTO `details` (`detail_id`, `detail_name`, `detail_ref`, `sub_cat_id`) VALUES
	(1, 'MODELE', NULL, 1),
	(2, 'DISPONIBILITE', NULL, 1),
	(3, 'COMPOSITION', NULL, 1);

-- Listage de la structure de la table ecom_literiedamour. opinion
DROP TABLE IF EXISTS `opinion`;
CREATE TABLE IF NOT EXISTS `opinion` (
  `opinion_id` int NOT NULL AUTO_INCREMENT,
  `opinion_detail` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `opinion_star` int DEFAULT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`opinion_id`),
  KEY `opinion_product_FK` (`product_id`),
  CONSTRAINT `opinion_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.opinion : ~0 rows (environ)
DELETE FROM `opinion`;

-- Listage de la structure de la table ecom_literiedamour. order_p
DROP TABLE IF EXISTS `order_p`;
CREATE TABLE IF NOT EXISTS `order_p` (
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_qt_o` int DEFAULT NULL,
  `product_price_o` decimal(15,3) DEFAULT NULL,
  `product_info1_o` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_info2_o` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_order_status` int DEFAULT NULL,
  PRIMARY KEY (`product_id`,`order_id`),
  KEY `order_p_customer_order0_FK` (`order_id`),
  CONSTRAINT `order_p_customer_order0_FK` FOREIGN KEY (`order_id`) REFERENCES `customer_order` (`order_id`),
  CONSTRAINT `order_p_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.order_p : ~19 rows (environ)
DELETE FROM `order_p`;
INSERT INTO `order_p` (`product_id`, `order_id`, `product_qt_o`, `product_price_o`, `product_info1_o`, `product_info2_o`, `product_order_status`) VALUES
	(51, 6, 1, 5000.000, NULL, NULL, 1),
	(52, 4, 155, 5000.000, NULL, NULL, 1),
	(52, 6, 1, 5000.000, NULL, NULL, 1),
	(53, 6, 1, 5000.000, NULL, NULL, 1),
	(54, 6, 1, 5000.000, NULL, NULL, 1),
	(55, 6, 1, 5000.000, NULL, NULL, 1),
	(56, 4, 1, 5700.000, NULL, NULL, 1),
	(56, 6, 1, 5700.000, NULL, NULL, 1),
	(57, 5, 1, 5000.000, NULL, NULL, 1),
	(57, 6, 1, 5000.000, NULL, NULL, 1),
	(58, 1, 1, 5000.000, NULL, NULL, 1),
	(58, 2, 1, 5000.000, NULL, NULL, 1),
	(58, 3, 1, 5000.000, NULL, NULL, 1),
	(58, 4, 1, 5000.000, NULL, NULL, 1),
	(58, 6, 1, 5000.000, NULL, NULL, 1),
	(59, 3, 1, 18000.000, NULL, NULL, 1),
	(59, 4, 1, 18000.000, NULL, NULL, 1),
	(59, 5, 1, 18000.000, NULL, NULL, 1),
	(59, 6, 1, 18000.000, NULL, NULL, 1);

-- Listage de la structure de la table ecom_literiedamour. order_stat
DROP TABLE IF EXISTS `order_stat`;
CREATE TABLE IF NOT EXISTS `order_stat` (
  `stat_id` int NOT NULL,
  `order_id` int NOT NULL,
  `order_stat_date` datetime DEFAULT NULL,
  `order_stat_comment` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`stat_id`,`order_id`),
  KEY `order_stat_customer_order0_FK` (`order_id`),
  CONSTRAINT `order_stat_customer_order0_FK` FOREIGN KEY (`order_id`) REFERENCES `customer_order` (`order_id`),
  CONSTRAINT `order_stat_status_FK` FOREIGN KEY (`stat_id`) REFERENCES `status` (`stat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.order_stat : ~6 rows (environ)
DELETE FROM `order_stat`;
INSERT INTO `order_stat` (`stat_id`, `order_id`, `order_stat_date`, `order_stat_comment`) VALUES
	(1, 3, '2024-01-28 12:49:38', NULL),
	(1, 4, '2024-01-30 13:06:28', NULL),
	(1, 5, '2024-01-30 13:36:38', NULL),
	(1, 6, '2024-01-30 14:51:37', NULL),
	(4, 1, '2023-12-20 14:30:58', NULL),
	(5, 2, '2024-01-28 12:20:56', NULL);

-- Listage de la structure de la table ecom_literiedamour. privilege
DROP TABLE IF EXISTS `privilege`;
CREATE TABLE IF NOT EXISTS `privilege` (
  `priv_id` int NOT NULL AUTO_INCREMENT,
  `priv_name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`priv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.privilege : ~5 rows (environ)
DELETE FROM `privilege`;
INSERT INTO `privilege` (`priv_id`, `priv_name`) VALUES
	(1, 'Superadmin'),
	(2, 'Admin'),
	(3, 'client'),
	(4, 'shop'),
	(5, 'buyer');

-- Listage de la structure de la table ecom_literiedamour. product
DROP TABLE IF EXISTS `product`;
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_ref` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_name` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_desig` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_qt` int DEFAULT NULL,
  `product_price` decimal(15,2) DEFAULT NULL,
  `product_info1` text COLLATE utf8mb4_general_ci,
  `product_info2` text COLLATE utf8mb4_general_ci,
  `product_info3` text COLLATE utf8mb4_general_ci,
  `product_info4` text COLLATE utf8mb4_general_ci,
  `product_info5` text COLLATE utf8mb4_general_ci,
  `product_imgdir` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_pic` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `product_imgcount` int DEFAULT NULL,
  `product_rate` float DEFAULT NULL,
  `sub_cat_id` int DEFAULT NULL,
  `brand_id` int DEFAULT NULL,
  `shop_id` int DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `product_sub_category_FK` (`sub_cat_id`),
  KEY `product_brand0_FK` (`brand_id`),
  KEY `product_shop_FK` (`shop_id`),
  CONSTRAINT `FK_product_brand` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`brand_id`),
  CONSTRAINT `FK_product_sub_category` FOREIGN KEY (`sub_cat_id`) REFERENCES `sub_category` (`sub_cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.product : ~9 rows (environ)
DELETE FROM `product`;
INSERT INTO `product` (`product_id`, `product_ref`, `product_name`, `product_desig`, `product_qt`, `product_price`, `product_info1`, `product_info2`, `product_info3`, `product_info4`, `product_info5`, `product_imgdir`, `product_pic`, `product_imgcount`, `product_rate`, `sub_cat_id`, `brand_id`, `shop_id`) VALUES
	(51, '0001', 'AUTUM', 'MODELE :        * AUTEM\r\nDISPONIBILITE : * EN DRAP 7 PIECES  \r\nQT :            * 00000       \r\nCOMPOSITION :\r\n                * 07 Pieces  \r\n                * Drap Plat 2.45*2.35\r\n                * Housse De Matela Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Imprimé', 1000, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 2, 1),
	(52, '0002', 'KHAMSA BOIS DE ROZE', 'MODELE :        * KHAMSA BOIS DE ROZE  \r\nDISPONIBILITE : * EN DRAP 7 PIECES  \r\nQT :            * 00000       \r\nCOMPOSITION :\r\n                * 07 Pieces  \r\n                * Drap Plat 2.45*2.35\r\n                * Housse De Matela Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Imprimé', 1, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 2, 1),
	(53, '0002', 'BRIDE', '- COMPOSITION :\r\n                  * 07 pieces  \r\n                  * Drap plat 2.45*2.35\r\n                  * Housse de matela standard \r\n                  * 04 Taies d\'oreiller 70*50\r\n                  * 01 Jeté imprimé', 1, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 2, 1),
	(54, 'ELEGANT', 'ELEGANT', 'ELEGANT', 1, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 2, 1),
	(55, 'KHAMSA GOLD', 'KHAMSA GOLD', 'KHAMSA GOLD', 1, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 2, 1),
	(56, 'INFINITY ROUGE', 'INFINITY ROUGE', 'INFINITY ROUGE', 1, 5700.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 2, 1),
	(57, 'INFINITY VERT', 'INFINITY VERT', 'INFINITY VERT', 1, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 2, 1),
	(58, '0003', 'KHAMSA VERT', 'KHAMSA VERT', 0, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 2, 1),
	(59, 'ROYAL', 'ROYAL', 'ROYAL', 1, 18000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 2, 1);

-- Listage de la structure de la table ecom_literiedamour. product_details
DROP TABLE IF EXISTS `product_details`;
CREATE TABLE IF NOT EXISTS `product_details` (
  `detail_id` int NOT NULL,
  `product_id` int NOT NULL,
  `detail_desig` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`detail_id`,`product_id`),
  KEY `product_details_FK1` (`product_id`),
  KEY `product_details_FK2` (`detail_id`),
  CONSTRAINT `product_details_FK1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `product_details_FK2` FOREIGN KEY (`detail_id`) REFERENCES `details` (`detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.product_details : ~8 rows (environ)
DELETE FROM `product_details`;
INSERT INTO `product_details` (`detail_id`, `product_id`, `detail_desig`) VALUES
	(1, 53, 'BRIDE'),
	(1, 54, 'ELEGANT'),
	(1, 59, 'ROYAL'),
	(2, 53, 'EN DRAP 7 PIECES'),
	(2, 54, 'EN DRAP 7 PIECES'),
	(2, 59, 'COUVRE-LIT 10 PIECES'),
	(3, 53, '* 07 pieces                     * Drap plat 2.45*2.35                   * Housse de matela standard                    * 04 Taies d\'oreiller 70*50                * 01 Jeté imprimé'),
	(3, 54, '* 07 Pieces                   * Drap Plat 2.45*2.35                 * Housse De Matela Standard                  * 04 Taies D\'oreiller 70*50                 * 01 Jeté Imprimé'),
	(3, 59, '* 10 Pieces                     * Drap Plat 2.45*2.35                   * Housse De Matela Standard                    * 04 Taies D\'oreiller 70*50                   * 01 Jeté Imprimé');

-- Listage de la structure de la table ecom_literiedamour. property
DROP TABLE IF EXISTS `property`;
CREATE TABLE IF NOT EXISTS `property` (
  `property_id` int NOT NULL AUTO_INCREMENT,
  `property_name` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `property_ref` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `property_type_id` int NOT NULL,
  PRIMARY KEY (`property_id`),
  KEY `property_property_type_FK` (`property_type_id`),
  CONSTRAINT `property_property_type_FK` FOREIGN KEY (`property_type_id`) REFERENCES `property_type` (`property_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.property : ~14 rows (environ)
DELETE FROM `property`;
INSERT INTO `property` (`property_id`, `property_name`, `property_ref`, `property_type_id`) VALUES
	(1, 'rouge', '#cc3333', 2),
	(2, 'bleu', '#3399cc', 2),
	(3, 'noire', '#333333', 2),
	(4, 'Standard', NULL, 1),
	(5, 'S', NULL, 1),
	(6, 'M', NULL, 1),
	(7, 'L', NULL, 1),
	(8, 'XL', NULL, 1),
	(9, 'XXL', NULL, 1),
	(10, '36', NULL, 1),
	(11, '38', NULL, 1),
	(12, '40', NULL, 1),
	(13, '42', NULL, 1),
	(14, '44', NULL, 1);

-- Listage de la structure de la table ecom_literiedamour. property_p
DROP TABLE IF EXISTS `property_p`;
CREATE TABLE IF NOT EXISTS `property_p` (
  `property_id` int NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`property_id`,`product_id`),
  KEY `property_p_product0_FK` (`product_id`),
  CONSTRAINT `property_p_product0_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `property_p_property_FK` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.property_p : ~0 rows (environ)
DELETE FROM `property_p`;

-- Listage de la structure de la table ecom_literiedamour. property_type
DROP TABLE IF EXISTS `property_type`;
CREATE TABLE IF NOT EXISTS `property_type` (
  `property_type_id` int NOT NULL AUTO_INCREMENT,
  `property_type_name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`property_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.property_type : ~2 rows (environ)
DELETE FROM `property_type`;
INSERT INTO `property_type` (`property_type_id`, `property_type_name`) VALUES
	(1, 'size'),
	(2, 'color');

-- Listage de la structure de la table ecom_literiedamour. shop
DROP TABLE IF EXISTS `shop`;
CREATE TABLE IF NOT EXISTS `shop` (
  `shop_id` int NOT NULL AUTO_INCREMENT,
  `shop_ref` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shop_name` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shop_address` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shop_phone` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shop_email` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `shop_status` int DEFAULT NULL,
  PRIMARY KEY (`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.shop : ~0 rows (environ)
DELETE FROM `shop`;
INSERT INTO `shop` (`shop_id`, `shop_ref`, `shop_name`, `shop_address`, `shop_phone`, `shop_email`, `shop_status`) VALUES
	(1, NULL, 'Iphone Prix Algérie', NULL, NULL, NULL, 1);

-- Listage de la structure de la table ecom_literiedamour. status
DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `stat_id` int NOT NULL AUTO_INCREMENT,
  `stat_name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `stat_color` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`stat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.status : ~5 rows (environ)
DELETE FROM `status`;
INSERT INTO `status` (`stat_id`, `stat_name`, `stat_color`) VALUES
	(1, 'En cours de validation', 'warning'),
	(2, 'Annulée', 'danger'),
	(3, 'Valider', 'info'),
	(4, 'Récéptionnée', 'success'),
	(5, 'Retour', 'secondary');

-- Listage de la structure de la table ecom_literiedamour. sub_category
DROP TABLE IF EXISTS `sub_category`;
CREATE TABLE IF NOT EXISTS `sub_category` (
  `sub_cat_id` int NOT NULL AUTO_INCREMENT,
  `sub_cat_name` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `sub_cat_pic` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `cat_id` int NOT NULL,
  PRIMARY KEY (`sub_cat_id`),
  KEY `sub_category_category_FK` (`cat_id`),
  CONSTRAINT `sub_category_category_FK` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.sub_category : ~4 rows (environ)
DELETE FROM `sub_category`;
INSERT INTO `sub_category` (`sub_cat_id`, `sub_cat_name`, `sub_cat_pic`, `cat_id`) VALUES
	(1, 'Literies', NULL, 1),
	(2, 'Rideaux', NULL, 1),
	(3, 'Décoration de chambre', NULL, 1),
	(4, 'Linge de maison', NULL, 1);

-- Listage de la structure de la table ecom_literiedamour. user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_id_s` varchar(32) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_lastname` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_address` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_phone` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_email` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_username` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `user_password` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `priv_id` int NOT NULL,
  `wilaya_id` int NOT NULL,
  `user_status` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_privilege_FK` (`priv_id`),
  KEY `user_wilaya0_FK` (`wilaya_id`),
  CONSTRAINT `user_privilege_FK` FOREIGN KEY (`priv_id`) REFERENCES `privilege` (`priv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.user : ~9 rows (environ)
DELETE FROM `user`;
INSERT INTO `user` (`user_id`, `user_id_s`, `user_name`, `user_lastname`, `user_address`, `user_phone`, `user_email`, `user_username`, `user_password`, `priv_id`, `wilaya_id`, `user_status`) VALUES
	(1, NULL, 'superadmin', 'superadmin', NULL, NULL, NULL, 'superadmin', '$2b$10$9tuFe9U3koCZWC7Kv3Lrmugfdvq3JoEaeuRqVKngCYCF/NjFIv28q', 1, 16, 1),
	(2, NULL, 'ipa_admin', NULL, NULL, NULL, NULL, 'literiedamour_admin', '$2b$10$H03YUVh/5oQkgZpJc/IoEOCRc0VpiDfrkCKaGSalFOkx.AVOg2leu', 2, 16, 1),
	(3, NULL, 'ZEININNz', 'zineddine', '16565', '0555555555', NULL, NULL, NULL, 5, 1, 1),
	(4, 'b1a983e71635bf4b0884ffe6f2e25562', 'zinz', 'zin', 'zzzzzzz', '055555555', 'zineddine-15@hotmail.com', '454545', '$2b$10$XNq0EBm..nZEe.1ht1lR2uj.tpR5xN1hT.G0PjHti.TRSkiaGjjHK', 3, 6, 1),
	(5, '694c954e5f1657668afe93d41ae389f6', 'test', 'test', 'test', '0555555555', 'zineddine-15@hotmail.com', 'test', '$2b$10$4mwdMTbFHBPvpkztDH3TVuOdXOk2k8CV/NmBt50UJ7oiCykF9.EUK', 3, 17, 1),
	(6, NULL, 'zineddine', 'zineddine', '08115465', '055548799', NULL, NULL, NULL, 5, 9, 1),
	(7, NULL, 'Test', 'Test', NULL, '0555975425', NULL, NULL, NULL, 5, 16, 1),
	(8, NULL, 'test', 'test', NULL, '555555', NULL, NULL, NULL, 5, 1, 1),
	(9, NULL, 'zinou', 'zinou', NULL, '021548478', NULL, NULL, NULL, 5, 1, 1);

-- Listage de la structure de la table ecom_literiedamour. user_shop
DROP TABLE IF EXISTS `user_shop`;
CREATE TABLE IF NOT EXISTS `user_shop` (
  `shop_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  PRIMARY KEY (`shop_id`,`user_id`),
  KEY `user_shop_user0_FK` (`user_id`),
  CONSTRAINT `user_shop_shop_FK` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`),
  CONSTRAINT `user_shop_user0_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.user_shop : ~0 rows (environ)
DELETE FROM `user_shop`;
INSERT INTO `user_shop` (`shop_id`, `user_id`) VALUES
	(1, 2);

-- Listage de la structure de la table ecom_literiedamour. wilaya
DROP TABLE IF EXISTS `wilaya`;
CREATE TABLE IF NOT EXISTS `wilaya` (
  `wilaya_id` int NOT NULL AUTO_INCREMENT,
  `wilaya_num` varchar(2) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `wilaya_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`wilaya_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.wilaya : ~48 rows (environ)
DELETE FROM `wilaya`;
INSERT INTO `wilaya` (`wilaya_id`, `wilaya_num`, `wilaya_name`) VALUES
	(1, '1', 'Adrar'),
	(2, '2', 'Chlef'),
	(3, '3', 'Laghouat'),
	(4, '4', 'Oum El Bouaghi'),
	(5, '5', 'Batna'),
	(6, '6', 'Bejaia'),
	(7, '7', 'Biskra'),
	(8, '8', 'Bechar'),
	(9, '9', 'Blida'),
	(10, '10', 'Bouira'),
	(11, '11', 'Tamanrasset'),
	(12, '12', 'Tebessa'),
	(13, '13', 'Tlemce'),
	(14, '14', 'Tiaret'),
	(15, '15', 'Tizi Ouzou'),
	(16, '16', 'Alger'),
	(17, '17', 'Djelfa'),
	(18, '18', 'Jijel'),
	(19, '19', 'Setif'),
	(20, '20', 'Saida'),
	(21, '21', 'Skikda'),
	(22, '22', 'Sidi Bel Abbes'),
	(23, '23', 'Annaba'),
	(24, '24', 'Guelma'),
	(25, '25', 'Constantine'),
	(26, '26', 'Medea'),
	(27, '27', 'Mostaganem'),
	(28, '28', 'MSila'),
	(29, '29', 'Mascara'),
	(30, '30', 'Ouargla'),
	(31, '31', 'Oran'),
	(32, '32', 'El Bayadh'),
	(33, '33', 'Illizi'),
	(34, '34', 'Bordj Bou Arreridj'),
	(35, '35', 'Boumerdes'),
	(36, '36', 'El Tarf'),
	(37, '37', 'Tindouf'),
	(38, '38', 'Tissemsilt'),
	(39, '39', 'El Oued'),
	(40, '40', 'Khenchela'),
	(41, '41', 'Souk Ahras'),
	(42, '42', 'Tipaza'),
	(43, '43', 'Mila'),
	(44, '44', 'Ain Defla'),
	(45, '45', 'Naama'),
	(46, '46', 'Ain Temouchent'),
	(47, '47', 'Ghardaia'),
	(48, '48', 'Relizane');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
