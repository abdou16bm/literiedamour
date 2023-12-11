-- --------------------------------------------------------

-- Hôte:                         127.0.0.1

-- Version du serveur:           10.4.28-MariaDB - mariadb.org binary distribution

-- SE du serveur:                Win64

-- HeidiSQL Version:             12.5.0.6677

-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */

;

/*!40101 SET NAMES utf8 */

;

/*!50503 SET NAMES utf8mb4 */

;

/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */

;

/*!40103 SET TIME_ZONE='+00:00' */

;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */

;

/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */

;

/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */

;

-- Listage de la structure de la base pour ecom_literiedamour

/* DROP DATABASE IF EXISTS `ecom_literiedamour`;
 */

CREATE DATABASE
    IF NOT EXISTS `ecom_literiedamour`
    /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */
;

USE `ecom_literiedamour`;

-- Listage de la structure de la table ecom_literiedamour. abonnement

DROP TABLE IF EXISTS `abonnement`;

CREATE TABLE
    IF NOT EXISTS `abonnement` (
        `abonnement_id` int(11) NOT NULL AUTO_INCREMENT,
        `abonnement_ref` varchar(30) DEFAULT NULL,
        `abonnement_dateb` date DEFAULT NULL,
        `abonnement_datee` date DEFAULT NULL,
        `abonnement_price` decimal(15, 3) DEFAULT NULL,
        `shop_id` int(11) NOT NULL,
        PRIMARY KEY (`abonnement_id`),
        KEY `abonnement_shop_FK` (`shop_id`),
        CONSTRAINT `abonnement_shop_FK` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.abonnement : ~0 rows (environ)

DELETE FROM `abonnement`;

-- Listage de la structure de la table ecom_literiedamour. ads

DROP TABLE IF EXISTS `ads`;

CREATE TABLE
    IF NOT EXISTS `ads` (
        `ads_id` int(11) NOT NULL AUTO_INCREMENT,
        `ads_ord` int(11) DEFAULT NULL,
        `ads_positive` int(11) DEFAULT NULL,
        `ads_negative` int(11) DEFAULT NULL,
        `product_id` int(11) NOT NULL,
        PRIMARY KEY (`ads_id`),
        KEY `ads_product_FK` (`product_id`),
        CONSTRAINT `ads_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.ads : ~0 rows (environ)

DELETE FROM `ads`;

-- Listage de la structure de la table ecom_literiedamour. brand

DROP TABLE IF EXISTS `brand`;

CREATE TABLE
    IF NOT EXISTS `brand` (
        `brand_id` int(11) NOT NULL AUTO_INCREMENT,
        `brand_name` varchar(30) DEFAULT NULL,
        `brand_pic` varchar(500) DEFAULT NULL,
        PRIMARY KEY (`brand_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.brand : ~0 rows (environ)

DELETE FROM `brand`;

-- Listage de la structure de la table ecom_literiedamour. cart

DROP TABLE IF EXISTS `cart`;

CREATE TABLE
    IF NOT EXISTS `cart` (
        `cart_id` int(11) NOT NULL AUTO_INCREMENT,
        `cart_ref` varchar(30) DEFAULT NULL,
        `cart_date` datetime DEFAULT NULL,
        `cart_status` int(11) DEFAULT NULL,
        `user_id` int(11) NOT NULL,
        PRIMARY KEY (`cart_id`),
        UNIQUE KEY `cart_user_AK` (`user_id`),
        CONSTRAINT `cart_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.cart : ~0 rows (environ)

DELETE FROM `cart`;

-- Listage de la structure de la table ecom_literiedamour. cart_p

DROP TABLE IF EXISTS `cart_p`;

CREATE TABLE
    IF NOT EXISTS `cart_p` (
        `product_id` int(11) NOT NULL,
        `cart_id` int(11) NOT NULL,
        `product_qt_c` int(11) DEFAULT NULL,
        `product_price_c` decimal(15, 3) DEFAULT NULL,
        `product_info1_c` varchar(50) DEFAULT NULL,
        `product_info2_c` varchar(50) DEFAULT NULL,
        PRIMARY KEY (`product_id`, `cart_id`),
        KEY `cart_p_cart0_FK` (`cart_id`),
        CONSTRAINT `cart_p_cart0_FK` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`),
        CONSTRAINT `cart_p_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.cart_p : ~0 rows (environ)

DELETE FROM `cart_p`;

-- Listage de la structure de la table ecom_literiedamour. category

DROP TABLE IF EXISTS `category`;

CREATE TABLE
    IF NOT EXISTS `category` (
        `cat_id` int(11) NOT NULL AUTO_INCREMENT,
        `cat_name` varchar(200) DEFAULT NULL,
        `cat_pic` varchar(500) DEFAULT NULL,
        PRIMARY KEY (`cat_id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.category : ~1 rows (environ)

DELETE FROM `category`;

INSERT INTO
    `category` (
        `cat_id`,
        `cat_name`,
        `cat_pic`
    )
VALUES (1, 'Iphone Prix Algérie', NULL);

-- Listage de la structure de la table ecom_literiedamour. customer_order

DROP TABLE IF EXISTS `customer_order`;

CREATE TABLE
    IF NOT EXISTS `customer_order` (
        `order_id` int(11) NOT NULL AUTO_INCREMENT,
        `order_ref` varchar(30) DEFAULT NULL,
        `order_date` datetime DEFAULT NULL,
        `order_status` int(11) DEFAULT NULL,
        `order_total_price` decimal(15, 3) NOT NULL,
        `order_imgdir` varchar(500) DEFAULT NULL,
        `user_id` int(11) NOT NULL,
        PRIMARY KEY (`order_id`),
        KEY `customer_order_user_FK` (`user_id`),
        CONSTRAINT `customer_order_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.customer_order : ~0 rows (environ)

DELETE FROM `customer_order`;

-- Listage de la structure de la table ecom_literiedamour. delivery_price

DROP TABLE IF EXISTS `delivery_price`;

CREATE TABLE
    IF NOT EXISTS `delivery_price` (
        `wilaya_id` int(11) NOT NULL,
        `shop_id` int(11) NOT NULL,
        `delivery_price` decimal(15, 3) DEFAULT NULL,
        PRIMARY KEY (`wilaya_id`, `shop_id`),
        KEY `delivery_price_shop0_FK` (`shop_id`),
        CONSTRAINT `delivery_price_shop0_FK` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`),
        CONSTRAINT `delivery_price_wilaya_FK` FOREIGN KEY (`wilaya_id`) REFERENCES `wilaya` (`wilaya_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.delivery_price : ~0 rows (environ)

DELETE FROM `delivery_price`;

-- Listage de la structure de la table ecom_literiedamour. details

DROP TABLE IF EXISTS `details`;

CREATE TABLE
    IF NOT EXISTS `details` (
        `detail_id` int(11) NOT NULL AUTO_INCREMENT,
        `detail_name` varchar(200) DEFAULT NULL,
        `detail_ref` varchar(15) DEFAULT NULL,
        `sub_cat_id` int(11) DEFAULT NULL,
        PRIMARY KEY (`detail_id`),
        KEY `FK_details_sub_category` (`sub_cat_id`),
        CONSTRAINT `FK_details_sub_category` FOREIGN KEY (`sub_cat_id`) REFERENCES `sub_category` (`sub_cat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.details : ~0 rows (environ)

DELETE FROM `details`;

-- Listage de la structure de la table ecom_literiedamour. opinion

DROP TABLE IF EXISTS `opinion`;

CREATE TABLE
    IF NOT EXISTS `opinion` (
        `opinion_id` int(11) NOT NULL AUTO_INCREMENT,
        `opinion_detail` varchar(500) DEFAULT NULL,
        `opinion_star` int(11) DEFAULT NULL,
        `product_id` int(11) NOT NULL,
        PRIMARY KEY (`opinion_id`),
        KEY `opinion_product_FK` (`product_id`),
        CONSTRAINT `opinion_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.opinion : ~0 rows (environ)

DELETE FROM `opinion`;

-- Listage de la structure de la table ecom_literiedamour. order_p

DROP TABLE IF EXISTS `order_p`;

CREATE TABLE
    IF NOT EXISTS `order_p` (
        `product_id` int(11) NOT NULL,
        `order_id` int(11) NOT NULL,
        `product_qt_o` int(11) DEFAULT NULL,
        `product_price_o` decimal(15, 3) DEFAULT NULL,
        `product_info1_o` varchar(50) DEFAULT NULL,
        `product_info2_o` varchar(50) DEFAULT NULL,
        `product_order_status` int(11) DEFAULT NULL,
        PRIMARY KEY (`product_id`, `order_id`),
        KEY `order_p_customer_order0_FK` (`order_id`),
        CONSTRAINT `order_p_customer_order0_FK` FOREIGN KEY (`order_id`) REFERENCES `customer_order` (`order_id`),
        CONSTRAINT `order_p_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.order_p : ~0 rows (environ)

DELETE FROM `order_p`;

-- Listage de la structure de la table ecom_literiedamour. order_stat

DROP TABLE IF EXISTS `order_stat`;

CREATE TABLE
    IF NOT EXISTS `order_stat` (
        `stat_id` int(11) NOT NULL,
        `order_id` int(11) NOT NULL,
        `order_stat_date` datetime DEFAULT NULL,
        `order_stat_comment` varchar(200) DEFAULT NULL,
        PRIMARY KEY (`stat_id`, `order_id`),
        KEY `order_stat_customer_order0_FK` (`order_id`),
        CONSTRAINT `order_stat_customer_order0_FK` FOREIGN KEY (`order_id`) REFERENCES `customer_order` (`order_id`),
        CONSTRAINT `order_stat_status_FK` FOREIGN KEY (`stat_id`) REFERENCES `status` (`stat_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.order_stat : ~0 rows (environ)

DELETE FROM `order_stat`;

-- Listage de la structure de la table ecom_literiedamour. privilege

DROP TABLE IF EXISTS `privilege`;

CREATE TABLE
    IF NOT EXISTS `privilege` (
        `priv_id` int(11) NOT NULL AUTO_INCREMENT,
        `priv_name` varchar(30) DEFAULT NULL,
        PRIMARY KEY (`priv_id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.privilege : ~5 rows (environ)

DELETE FROM `privilege`;

INSERT INTO
    `privilege` (`priv_id`, `priv_name`)
VALUES (1, 'Superadmin'), (2, 'Admin'), (3, 'client'), (4, 'shop'), (5, 'buyer');

-- Listage de la structure de la table ecom_literiedamour. product

DROP TABLE IF EXISTS `product`;

CREATE TABLE
    IF NOT EXISTS `product` (
        `product_id` int(11) NOT NULL AUTO_INCREMENT,
        `product_ref` varchar(100) DEFAULT NULL,
        `product_name` varchar(200) DEFAULT NULL,
        `product_desig` varchar(500) DEFAULT NULL,
        `product_qt` int(11) DEFAULT NULL,
        `product_price` decimal(15, 2) DEFAULT NULL,
        `product_info1` text DEFAULT NULL,
        `product_info2` text DEFAULT NULL,
        `product_info3` text DEFAULT NULL,
        `product_info4` text DEFAULT NULL,
        `product_info5` text DEFAULT NULL,
        `product_imgdir` varchar(500) DEFAULT NULL,
        `product_pic` varchar(500) DEFAULT NULL,
        `product_imgcount` int(11) DEFAULT NULL,
        `product_rate` float DEFAULT NULL,
        `sub_cat_id` int(11) DEFAULT NULL,
        `brand_id` int(11) DEFAULT NULL,
        `shop_id` int(11) DEFAULT NULL,
        PRIMARY KEY (`product_id`),
        KEY `product_sub_category_FK` (`sub_cat_id`),
        KEY `product_brand0_FK` (`brand_id`),
        KEY `product_shop_FK` (`shop_id`),
        CONSTRAINT `FK_product_brand` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`brand_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT `FK_product_sub_category` FOREIGN KEY (`sub_cat_id`) REFERENCES `sub_category` (`sub_cat_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.product : ~0 rows (environ)

DELETE FROM `product`;

-- Listage de la structure de la table ecom_literiedamour. product_details

DROP TABLE IF EXISTS `product_details`;

CREATE TABLE
    IF NOT EXISTS `product_details` (
        `detail_id` int(11) NOT NULL,
        `product_id` int(11) NOT NULL,
        `detail_desig` varchar(300) DEFAULT NULL,
        PRIMARY KEY (`detail_id`, `product_id`),
        KEY `product_details_FK1` (`product_id`),
        KEY `product_details_FK2` (`detail_id`),
        CONSTRAINT `product_details_FK1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
        CONSTRAINT `product_details_FK2` FOREIGN KEY (`detail_id`) REFERENCES `details` (`detail_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.product_details : ~0 rows (environ)

DELETE FROM `product_details`;

-- Listage de la structure de la table ecom_literiedamour. property

DROP TABLE IF EXISTS `property`;

CREATE TABLE
    IF NOT EXISTS `property` (
        `property_id` int(11) NOT NULL AUTO_INCREMENT,
        `property_name` varchar(10) DEFAULT NULL,
        `property_ref` varchar(15) DEFAULT NULL,
        `property_type_id` int(11) NOT NULL,
        PRIMARY KEY (`property_id`),
        KEY `property_property_type_FK` (`property_type_id`),
        CONSTRAINT `property_property_type_FK` FOREIGN KEY (`property_type_id`) REFERENCES `property_type` (`property_type_id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 15 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.property : ~14 rows (environ)

DELETE FROM `property`;

INSERT INTO
    `property` (
        `property_id`,
        `property_name`,
        `property_ref`,
        `property_type_id`
    )
VALUES (1, 'rouge', '#cc3333', 2), (2, 'bleu', '#3399cc', 2), (3, 'noire', '#333333', 2), (4, 'Standard', NULL, 1), (5, 'S', NULL, 1), (6, 'M', NULL, 1), (7, 'L', NULL, 1), (8, 'XL', NULL, 1), (9, 'XXL', NULL, 1), (10, '36', NULL, 1), (11, '38', NULL, 1), (12, '40', NULL, 1), (13, '42', NULL, 1), (14, '44', NULL, 1);

-- Listage de la structure de la table ecom_literiedamour. property_p

DROP TABLE IF EXISTS `property_p`;

CREATE TABLE
    IF NOT EXISTS `property_p` (
        `property_id` int(11) NOT NULL,
        `product_id` int(11) NOT NULL,
        PRIMARY KEY (`property_id`, `product_id`),
        KEY `property_p_product0_FK` (`product_id`),
        CONSTRAINT `property_p_product0_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
        CONSTRAINT `property_p_property_FK` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.property_p : ~0 rows (environ)

DELETE FROM `property_p`;

-- Listage de la structure de la table ecom_literiedamour. property_type

DROP TABLE IF EXISTS `property_type`;

CREATE TABLE
    IF NOT EXISTS `property_type` (
        `property_type_id` int(11) NOT NULL AUTO_INCREMENT,
        `property_type_name` varchar(30) DEFAULT NULL,
        PRIMARY KEY (`property_type_id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.property_type : ~2 rows (environ)

DELETE FROM `property_type`;

INSERT INTO
    `property_type` (
        `property_type_id`,
        `property_type_name`
    )
VALUES (1, 'size'), (2, 'color');

-- Listage de la structure de la table ecom_literiedamour. shop

DROP TABLE IF EXISTS `shop`;

CREATE TABLE
    IF NOT EXISTS `shop` (
        `shop_id` int(11) NOT NULL AUTO_INCREMENT,
        `shop_ref` varchar(20) DEFAULT NULL,
        `shop_name` varchar(200) DEFAULT NULL,
        `shop_address` varchar(500) DEFAULT NULL,
        `shop_phone` varchar(15) DEFAULT NULL,
        `shop_email` varchar(50) DEFAULT NULL,
        `shop_status` int(11) DEFAULT NULL,
        PRIMARY KEY (`shop_id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.shop : ~1 rows (environ)

DELETE FROM `shop`;

INSERT INTO
    `shop` (
        `shop_id`,
        `shop_ref`,
        `shop_name`,
        `shop_address`,
        `shop_phone`,
        `shop_email`,
        `shop_status`
    )
VALUES (
        1,
        NULL,
        'Iphone Prix Algérie',
        NULL,
        NULL,
        NULL,
        1
    );

-- Listage de la structure de la table ecom_literiedamour. status

DROP TABLE IF EXISTS `status`;

CREATE TABLE
    IF NOT EXISTS `status` (
        `stat_id` int(11) NOT NULL AUTO_INCREMENT,
        `stat_name` varchar(30) DEFAULT NULL,
        PRIMARY KEY (`stat_id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.status : ~4 rows (environ)

DELETE FROM `status`;

INSERT INTO
    `status` (`stat_id`, `stat_name`)
VALUES (1, 'En cours de validation'), (2, 'Annulée'), (3, 'Valider'), (4, 'Récéptionnée');

-- Listage de la structure de la table ecom_literiedamour. sub_category

DROP TABLE IF EXISTS `sub_category`;

CREATE TABLE
    IF NOT EXISTS `sub_category` (
        `sub_cat_id` int(11) NOT NULL AUTO_INCREMENT,
        `sub_cat_name` varchar(200) DEFAULT NULL,
        `sub_cat_pic` varchar(500) DEFAULT NULL,
        `cat_id` int(11) NOT NULL,
        PRIMARY KEY (`sub_cat_id`),
        KEY `sub_category_category_FK` (`cat_id`),
        CONSTRAINT `sub_category_category_FK` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.sub_category : ~0 rows (environ)

DELETE FROM `sub_category`;

-- Listage de la structure de la table ecom_literiedamour. user

DROP TABLE IF EXISTS `user`;

CREATE TABLE
    IF NOT EXISTS `user` (
        `user_id` int(11) NOT NULL AUTO_INCREMENT,
        `user_id_s` varchar(32) DEFAULT NULL,
        `user_name` varchar(50) DEFAULT NULL,
        `user_lastname` varchar(50) DEFAULT NULL,
        `user_address` varchar(300) DEFAULT NULL,
        `user_phone` varchar(15) DEFAULT NULL,
        `user_email` varchar(50) DEFAULT NULL,
        `user_username` varchar(50) DEFAULT NULL,
        `user_password` varchar(200) DEFAULT NULL,
        `priv_id` int(11) NOT NULL,
        `wilaya_id` int(11) NOT NULL,
        `user_status` int(11) DEFAULT NULL,
        PRIMARY KEY (`user_id`),
        KEY `user_privilege_FK` (`priv_id`),
        KEY `user_wilaya0_FK` (`wilaya_id`),
        CONSTRAINT `user_privilege_FK` FOREIGN KEY (`priv_id`) REFERENCES `privilege` (`priv_id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.user : ~2 rows (environ)

DELETE FROM `user`;

INSERT INTO
    `user` (
        `user_id`,
        `user_id_s`,
        `user_name`,
        `user_lastname`,
        `user_address`,
        `user_phone`,
        `user_email`,
        `user_username`,
        `user_password`,
        `priv_id`,
        `wilaya_id`,
        `user_status`
    )
VALUES (
        1,
        NULL,
        'superadmin',
        'superadmin',
        NULL,
        NULL,
        NULL,
        'superadmin',
        '$2b$10$9tuFe9U3koCZWC7Kv3Lrmugfdvq3JoEaeuRqVKngCYCF/NjFIv28q',
        1,
        16,
        1
    ), (
        2,
        NULL,
        'ipa_admin',
        NULL,
        NULL,
        NULL,
        NULL,
        'ipa_admin',
        '$2b$10$/hqjNWggIt2oQxULY.OKZ.sYVFo.9UyLjJKAYOwRmfAeceLKZbWbC',
        2,
        16,
        1
    );

-- Listage de la structure de la table ecom_literiedamour. user_shop

DROP TABLE IF EXISTS `user_shop`;

CREATE TABLE
    IF NOT EXISTS `user_shop` (
        `shop_id` int(11) NOT NULL AUTO_INCREMENT,
        `user_id` int(11) NOT NULL,
        PRIMARY KEY (`shop_id`, `user_id`),
        KEY `user_shop_user0_FK` (`user_id`),
        CONSTRAINT `user_shop_shop_FK` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`),
        CONSTRAINT `user_shop_user0_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.user_shop : ~1 rows (environ)

DELETE FROM `user_shop`;

INSERT INTO `user_shop` (`shop_id`, `user_id`) VALUES (1, 2);

-- Listage de la structure de la table ecom_literiedamour. wilaya

DROP TABLE IF EXISTS `wilaya`;

CREATE TABLE
    IF NOT EXISTS `wilaya` (
        `wilaya_id` int(11) NOT NULL AUTO_INCREMENT,
        `wilaya_num` varchar(2) DEFAULT NULL,
        `wilaya_name` varchar(50) DEFAULT NULL,
        PRIMARY KEY (`wilaya_id`)
    ) ENGINE = InnoDB AUTO_INCREMENT = 49 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.wilaya : ~48 rows (environ)

DELETE FROM `wilaya`;

INSERT INTO
    `wilaya` (
        `wilaya_id`,
        `wilaya_num`,
        `wilaya_name`
    )
VALUES (1, '1', 'Adrar'), (2, '2', 'Chlef'), (3, '3', 'Laghouat'), (4, '4', 'Oum El Bouaghi'), (5, '5', 'Batna'), (6, '6', 'Bejaia'), (7, '7', 'Biskra'), (8, '8', 'Bechar'), (9, '9', 'Blida'), (10, '10', 'Bouira'), (11, '11', 'Tamanrasset'), (12, '12', 'Tebessa'), (13, '13', 'Tlemce'), (14, '14', 'Tiaret'), (15, '15', 'Tizi Ouzou'), (16, '16', 'Alger'), (17, '17', 'Djelfa'), (18, '18', 'Jijel'), (19, '19', 'Setif'), (20, '20', 'Saida'), (21, '21', 'Skikda'), (22, '22', 'Sidi Bel Abbes'), (23, '23', 'Annaba'), (24, '24', 'Guelma'), (25, '25', 'Constantine'), (26, '26', 'Medea'), (27, '27', 'Mostaganem'), (28, '28', 'MSila'), (29, '29', 'Mascara'), (30, '30', 'Ouargla'), (31, '31', 'Oran'), (32, '32', 'El Bayadh'), (33, '33', 'Illizi'), (34, '34', 'Bordj Bou Arreridj'), (35, '35', 'Boumerdes'), (36, '36', 'El Tarf'), (37, '37', 'Tindouf'), (38, '38', 'Tissemsilt'), (39, '39', 'El Oued'), (40, '40', 'Khenchela'), (41, '41', 'Souk Ahras'), (42, '42', 'Tipaza'), (43, '43', 'Mila'), (44, '44', 'Ain Defla'), (45, '45', 'Naama'), (46, '46', 'Ain Temouchent'), (47, '47', 'Ghardaia'), (48, '48', 'Relizane');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */

;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */

;

/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */

;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */

;

/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */

;