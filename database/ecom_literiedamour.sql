-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 11 déc. 2023 à 13:29
-- Version du serveur : 8.0.27
-- Version de PHP : 7.4.26


DROP DATABASE IF EXISTS `ecom_literiedamour`;

CREATE DATABASE
  IF NOT EXISTS `ecom_literiedamour`
  /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */
;

USE `ecom_literiedamour`;



/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ecom_literiedamour`
--

-- --------------------------------------------------------

--
-- Structure de la table `abonnement`
--

DROP TABLE IF EXISTS `abonnement`;
CREATE TABLE IF NOT EXISTS `abonnement` (
                                          `abonnement_id` int NOT NULL AUTO_INCREMENT,
                                          `abonnement_ref` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                          `abonnement_dateb` date DEFAULT NULL,
                                          `abonnement_datee` date DEFAULT NULL,
                                          `abonnement_price` decimal(15,3) DEFAULT NULL,
                                          `shop_id` int NOT NULL,
                                          PRIMARY KEY (`abonnement_id`),
                                          KEY `abonnement_shop_FK` (`shop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ads`
--

DROP TABLE IF EXISTS `ads`;
CREATE TABLE IF NOT EXISTS `ads` (
                                   `ads_id` int NOT NULL AUTO_INCREMENT,
                                   `ads_ord` int DEFAULT NULL,
                                   `ads_positive` int DEFAULT NULL,
                                   `ads_negative` int DEFAULT NULL,
                                   `product_id` int NOT NULL,
                                   PRIMARY KEY (`ads_id`),
                                   KEY `ads_product_FK` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `brand`
--

DROP TABLE IF EXISTS `brand`;
CREATE TABLE IF NOT EXISTS `brand` (
                                     `brand_id` int NOT NULL AUTO_INCREMENT,
                                     `brand_name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                     `brand_pic` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                     PRIMARY KEY (`brand_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `brand`
--

INSERT INTO `brand` (`brand_id`, `brand_name`, `brand_pic`) VALUES (1, 'Literie d''amour', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `cart`
--

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
                                    `cart_id` int NOT NULL AUTO_INCREMENT,
                                    `cart_ref` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                    `cart_date` datetime DEFAULT NULL,
                                    `cart_status` int DEFAULT NULL,
                                    `user_id` int NOT NULL,
                                    PRIMARY KEY (`cart_id`),
                                    UNIQUE KEY `cart_user_AK` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cart_p`
--

DROP TABLE IF EXISTS `cart_p`;
CREATE TABLE IF NOT EXISTS `cart_p` (
                                      `product_id` int NOT NULL,
                                      `cart_id` int NOT NULL,
                                      `product_qt_c` int DEFAULT NULL,
                                      `product_price_c` decimal(15,3) DEFAULT NULL,
                                      `product_info1_c` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                      `product_info2_c` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                      PRIMARY KEY (`product_id`,`cart_id`),
                                      KEY `cart_p_cart0_FK` (`cart_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
                                        `cat_id` int NOT NULL AUTO_INCREMENT,
                                        `cat_name` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                        `cat_pic` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                        PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`cat_id`, `cat_name`, `cat_pic`) VALUES
                                                           (1, 'Literies', NULL),
                                                           (2, 'Rideaux', NULL),
                                                           (3, 'Décoration de chambre', NULL),
                                                           (4, 'Linge de maison', NULL);


-- --------------------------------------------------------

--
-- Structure de la table `customer_order`
--

DROP TABLE IF EXISTS `customer_order`;
CREATE TABLE IF NOT EXISTS `customer_order` (
                                              `order_id` int NOT NULL AUTO_INCREMENT,
                                              `order_ref` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                              `order_date` datetime DEFAULT NULL,
                                              `order_status` int DEFAULT NULL,
                                              `order_total_price` decimal(15,3) NOT NULL,
                                              `order_imgdir` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                              `user_id` int NOT NULL,
                                              PRIMARY KEY (`order_id`),
                                              KEY `customer_order_user_FK` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `customer_order`
--

INSERT INTO `customer_order` (`order_id`, `order_ref`, `order_date`, `order_status`, `order_total_price`, `order_imgdir`, `user_id`) VALUES
  (1, NULL, '2023-12-11 13:06:48', 1, '5000.000', NULL, 3);

-- --------------------------------------------------------

--
-- Structure de la table `delivery_price`
--

DROP TABLE IF EXISTS `delivery_price`;
CREATE TABLE IF NOT EXISTS `delivery_price` (
                                              `wilaya_id` int NOT NULL,
                                              `shop_id` int NOT NULL,
                                              `delivery_price` decimal(15,3) DEFAULT NULL,
                                              PRIMARY KEY (`wilaya_id`,`shop_id`),
                                              KEY `delivery_price_shop0_FK` (`shop_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `delivery_price`
--

INSERT INTO `delivery_price` (`wilaya_id`, `shop_id`, `delivery_price`) VALUES
  (16, 1, '600.000');

-- --------------------------------------------------------

--
-- Structure de la table `details`
--

DROP TABLE IF EXISTS `details`;
CREATE TABLE IF NOT EXISTS `details` (
                                       `detail_id` int NOT NULL AUTO_INCREMENT,
                                       `detail_name` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                       `detail_ref` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                       `sub_cat_id` int DEFAULT NULL,
                                       PRIMARY KEY (`detail_id`),
                                       KEY `FK_details_sub_category` (`sub_cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `details`
--

INSERT INTO `details` (`detail_id`, `detail_name`, `detail_ref`, `sub_cat_id`) VALUES
                                                                                 (1, 'MODELE', NULL, 1),
                                                                                 (2, 'DISPONIBILITE', NULL, 1),
                                                                                 (3, 'COMPOSITION', NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `opinion`
--

DROP TABLE IF EXISTS `opinion`;
CREATE TABLE IF NOT EXISTS `opinion` (
                                       `opinion_id` int NOT NULL AUTO_INCREMENT,
                                       `opinion_detail` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                       `opinion_star` int DEFAULT NULL,
                                       `product_id` int NOT NULL,
                                       PRIMARY KEY (`opinion_id`),
                                       KEY `opinion_product_FK` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `order_p`
--

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
                                       KEY `order_p_customer_order0_FK` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `order_p`
--

INSERT INTO `order_p` (`product_id`, `order_id`, `product_qt_o`, `product_price_o`, `product_info1_o`, `product_info2_o`, `product_order_status`) VALUES
  (58, 1, 1, '5000.000', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `order_stat`
--

DROP TABLE IF EXISTS `order_stat`;
CREATE TABLE IF NOT EXISTS `order_stat` (
                                          `stat_id` int NOT NULL,
                                          `order_id` int NOT NULL,
                                          `order_stat_date` datetime DEFAULT NULL,
                                          `order_stat_comment` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                          PRIMARY KEY (`stat_id`,`order_id`),
                                          KEY `order_stat_customer_order0_FK` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `order_stat`
--

INSERT INTO `order_stat` (`stat_id`, `order_id`, `order_stat_date`, `order_stat_comment`) VALUES
  (1, 1, '2023-12-11 13:06:49', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `privilege`
--

DROP TABLE IF EXISTS `privilege`;
CREATE TABLE IF NOT EXISTS `privilege` (
                                         `priv_id` int NOT NULL AUTO_INCREMENT,
                                         `priv_name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                         PRIMARY KEY (`priv_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `privilege`
--

INSERT INTO `privilege` (`priv_id`, `priv_name`) VALUES
                                                   (1, 'Superadmin'),
                                                   (2, 'Admin'),
                                                   (3, 'client'),
                                                   (4, 'shop'),
                                                   (5, 'buyer');

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

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
                                       KEY `product_shop_FK` (`shop_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`product_id`, `product_ref`, `product_name`, `product_desig`, `product_qt`, `product_price`, `product_info1`, `product_info2`, `product_info3`, `product_info4`, `product_info5`, `product_imgdir`, `product_pic`, `product_imgcount`, `product_rate`, `sub_cat_id`, `brand_id`, `shop_id`) VALUES
                                                                                                                                                                                                                                                                                                                     (51, '0001', 'AUTUM', 'MODELE :        * AUTEM\r\nDISPONIBILITE : * EN DRAP 7 PIECES  \r\nQT :            * 00000       \r\nCOMPOSITION :\r\n                * 07 Pieces  \r\n                * Drap Plat 2.45*2.35\r\n                * Housse De Matela Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Imprimé', 1000, '5000.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
                                                                                                                                                                                                                                                                                                                     (52, '0002', 'KHAMSA BOIS DE ROZE', 'MODELE :        * KHAMSA BOIS DE ROZE  \r\nDISPONIBILITE : * EN DRAP 7 PIECES  \r\nQT :            * 00000       \r\nCOMPOSITION :\r\n                * 07 Pieces  \r\n                * Drap Plat 2.45*2.35\r\n                * Housse De Matela Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Imprimé', 1, '5000.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 1, 1),
                                                                                                                                                                                                                                                                                                                     (53, '0002', 'BRIDE', '- COMPOSITION :\r\n                  * 07 pieces  \r\n                  * Drap plat 2.45*2.35\r\n                  * Housse de matela standard \r\n                  * 04 Taies d\'oreiller 70*50\r\n                  * 01 Jeté imprimé', 1, '5000.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
                                                                                                                                                                                                                                                                                                                     (54, 'ELEGANT', 'ELEGANT', 'ELEGANT', 1, '5000.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
                                                                                                                                                                                                                                                                                                                     (55, 'KHAMSA GOLD', 'KHAMSA GOLD', 'KHAMSA GOLD', 1, '5000.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 1, 1),
                                                                                                                                                                                                                                                                                                                     (56, 'INFINITY ROUGE', 'INFINITY ROUGE', 'INFINITY ROUGE', 1, '5700.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
                                                                                                                                                                                                                                                                                                                     (57, 'INFINITY VERT', 'INFINITY VERT', 'INFINITY VERT', 1, '5000.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
                                                                                                                                                                                                                                                                                                                     (58, '0003', 'KHAMSA VERT', 'KHAMSA VERT', 1, '5000.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
                                                                                                                                                                                                                                                                                                                     (59, 'ROYAL', 'ROYAL', 'ROYAL', 1, '18000.00', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `product_details`
--

DROP TABLE IF EXISTS `product_details`;
CREATE TABLE IF NOT EXISTS `product_details` (
                                               `detail_id` int NOT NULL,
                                               `product_id` int NOT NULL,
                                               `detail_desig` varchar(300) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                               PRIMARY KEY (`detail_id`,`product_id`),
                                               KEY `product_details_FK1` (`product_id`),
                                               KEY `product_details_FK2` (`detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `product_details`
--

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

-- --------------------------------------------------------

--
-- Structure de la table `property`
--

DROP TABLE IF EXISTS `property`;
CREATE TABLE IF NOT EXISTS `property` (
                                        `property_id` int NOT NULL AUTO_INCREMENT,
                                        `property_name` varchar(10) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                        `property_ref` varchar(15) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                        `property_type_id` int NOT NULL,
                                        PRIMARY KEY (`property_id`),
                                        KEY `property_property_type_FK` (`property_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `property`
--

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

-- --------------------------------------------------------

--
-- Structure de la table `property_p`
--

DROP TABLE IF EXISTS `property_p`;
CREATE TABLE IF NOT EXISTS `property_p` (
                                          `property_id` int NOT NULL,
                                          `product_id` int NOT NULL,
                                          PRIMARY KEY (`property_id`,`product_id`),
                                          KEY `property_p_product0_FK` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `property_type`
--

DROP TABLE IF EXISTS `property_type`;
CREATE TABLE IF NOT EXISTS `property_type` (
                                             `property_type_id` int NOT NULL AUTO_INCREMENT,
                                             `property_type_name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                             PRIMARY KEY (`property_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `property_type`
--

INSERT INTO `property_type` (`property_type_id`, `property_type_name`) VALUES
                                                                         (1, 'size'),
                                                                         (2, 'color');

-- --------------------------------------------------------

--
-- Structure de la table `shop`
--

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

--
-- Déchargement des données de la table `shop`
--

INSERT INTO `shop` (`shop_id`, `shop_ref`, `shop_name`, `shop_address`, `shop_phone`, `shop_email`, `shop_status`) VALUES
  (1, NULL, 'Literie d''amour', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
                                      `stat_id` int NOT NULL AUTO_INCREMENT,
                                      `stat_name` varchar(30) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                      PRIMARY KEY (`stat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `status`
--

INSERT INTO `status` (`stat_id`, `stat_name`) VALUES
                                                (1, 'En cours de validation'),
                                                (2, 'Annulée'),
                                                (3, 'Valider'),
                                                (4, 'Récéptionnée');

-- --------------------------------------------------------

--
-- Structure de la table `sub_category`
--

DROP TABLE IF EXISTS `sub_category`;
CREATE TABLE IF NOT EXISTS `sub_category` (
                                            `sub_cat_id` int NOT NULL AUTO_INCREMENT,
                                            `sub_cat_name` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                            `sub_cat_pic` varchar(500) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                            `cat_id` int NOT NULL,
                                            PRIMARY KEY (`sub_cat_id`),
                                            KEY `sub_category_category_FK` (`cat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sub_category`
--

INSERT INTO `sub_category` (`sub_cat_id`, `sub_cat_name`, `sub_cat_pic`, `cat_id`) VALUES
                                                                                     (1, 'Lit double', NULL, 1),
                                                                                     (2, 'Rideaux à fleur' , NULL, 2),
                                                                                     (3, 'Veilleuse', NULL, 3),
                                                                                     (4, 'Tapis', NULL, 4);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

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
                                    KEY `user_wilaya0_FK` (`wilaya_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`user_id`, `user_id_s`, `user_name`, `user_lastname`, `user_address`, `user_phone`, `user_email`, `user_username`, `user_password`, `priv_id`, `wilaya_id`, `user_status`) VALUES
                                                                                                                                                                                                 (1, NULL, 'superadmin', 'superadmin', NULL, NULL, NULL, 'superadmin', '$2b$10$9tuFe9U3koCZWC7Kv3Lrmugfdvq3JoEaeuRqVKngCYCF/NjFIv28q', 1, 16, 1),
                                                                                                                                                                                                 (2, NULL, 'ipa_admin', NULL, NULL, NULL, NULL, 'literiedamour_admin', '$2b$10$H03YUVh/5oQkgZpJc/IoEOCRc0VpiDfrkCKaGSalFOkx.AVOg2leu', 2, 16, 1),
                                                                                                                                                                                                 (3, NULL, 'ZEININNz', 'zineddine', '16565', '0555555555', NULL, NULL, NULL, 5, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user_shop`
--

DROP TABLE IF EXISTS `user_shop`;
CREATE TABLE IF NOT EXISTS `user_shop` (
                                         `shop_id` int NOT NULL AUTO_INCREMENT,
                                         `user_id` int NOT NULL,
                                         PRIMARY KEY (`shop_id`,`user_id`),
                                         KEY `user_shop_user0_FK` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user_shop`
--

INSERT INTO `user_shop` (`shop_id`, `user_id`) VALUES
  (1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `wilaya`
--

DROP TABLE IF EXISTS `wilaya`;
CREATE TABLE IF NOT EXISTS `wilaya` (
                                      `wilaya_id` int NOT NULL AUTO_INCREMENT,
                                      `wilaya_num` varchar(2) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                      `wilaya_name` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
                                      PRIMARY KEY (`wilaya_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `wilaya`
--

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

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `abonnement`
--
ALTER TABLE `abonnement`
  ADD CONSTRAINT `abonnement_shop_FK` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`);

--
-- Contraintes pour la table `ads`
--
ALTER TABLE `ads`
  ADD CONSTRAINT `ads_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Contraintes pour la table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Contraintes pour la table `cart_p`
--
ALTER TABLE `cart_p`
  ADD CONSTRAINT `cart_p_cart0_FK` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`),
  ADD CONSTRAINT `cart_p_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Contraintes pour la table `customer_order`
--
ALTER TABLE `customer_order`
  ADD CONSTRAINT `customer_order_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Contraintes pour la table `delivery_price`
--
ALTER TABLE `delivery_price`
  ADD CONSTRAINT `delivery_price_shop0_FK` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`),
  ADD CONSTRAINT `delivery_price_wilaya_FK` FOREIGN KEY (`wilaya_id`) REFERENCES `wilaya` (`wilaya_id`);

--
-- Contraintes pour la table `details`
--
ALTER TABLE `details`
  ADD CONSTRAINT `FK_details_sub_category` FOREIGN KEY (`sub_cat_id`) REFERENCES `sub_category` (`sub_cat_id`);

--
-- Contraintes pour la table `opinion`
--
ALTER TABLE `opinion`
  ADD CONSTRAINT `opinion_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Contraintes pour la table `order_p`
--
ALTER TABLE `order_p`
  ADD CONSTRAINT `order_p_customer_order0_FK` FOREIGN KEY (`order_id`) REFERENCES `customer_order` (`order_id`),
  ADD CONSTRAINT `order_p_product_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Contraintes pour la table `order_stat`
--
ALTER TABLE `order_stat`
  ADD CONSTRAINT `order_stat_customer_order0_FK` FOREIGN KEY (`order_id`) REFERENCES `customer_order` (`order_id`),
  ADD CONSTRAINT `order_stat_status_FK` FOREIGN KEY (`stat_id`) REFERENCES `status` (`stat_id`);

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_product_brand` FOREIGN KEY (`brand_id`) REFERENCES `brand` (`brand_id`),
  ADD CONSTRAINT `FK_product_sub_category` FOREIGN KEY (`sub_cat_id`) REFERENCES `sub_category` (`sub_cat_id`);

--
-- Contraintes pour la table `product_details`
--
ALTER TABLE `product_details`
  ADD CONSTRAINT `product_details_FK1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `product_details_FK2` FOREIGN KEY (`detail_id`) REFERENCES `details` (`detail_id`);

--
-- Contraintes pour la table `property`
--
ALTER TABLE `property`
  ADD CONSTRAINT `property_property_type_FK` FOREIGN KEY (`property_type_id`) REFERENCES `property_type` (`property_type_id`);

--
-- Contraintes pour la table `property_p`
--
ALTER TABLE `property_p`
  ADD CONSTRAINT `property_p_product0_FK` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `property_p_property_FK` FOREIGN KEY (`property_id`) REFERENCES `property` (`property_id`);

--
-- Contraintes pour la table `sub_category`
--
ALTER TABLE `sub_category`
  ADD CONSTRAINT `sub_category_category_FK` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_privilege_FK` FOREIGN KEY (`priv_id`) REFERENCES `privilege` (`priv_id`);

--
-- Contraintes pour la table `user_shop`
--
ALTER TABLE `user_shop`
  ADD CONSTRAINT `user_shop_shop_FK` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`),
  ADD CONSTRAINT `user_shop_user0_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
