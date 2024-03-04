-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : lun. 04 mars 2024 à 12:15
-- Version du serveur : 5.7.44-cll-lve
-- Version de PHP : 8.1.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `literiedamour_ecom_literiedamour`
--

DROP DATABASE IF EXISTS `ecom_literiedamour`;
CREATE DATABASE
    IF NOT EXISTS `ecom_literiedamour`;
USE `ecom_literiedamour`;

-- --------------------------------------------------------

--
-- Structure de la table `abonnement`
--

CREATE TABLE `abonnement` (
                              `abonnement_id` int(11) NOT NULL,
                              `abonnement_ref` varchar(30) DEFAULT NULL,
                              `abonnement_dateb` date DEFAULT NULL,
                              `abonnement_datee` date DEFAULT NULL,
                              `abonnement_price` decimal(15,3) DEFAULT NULL,
                              `shop_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `ads`
--

CREATE TABLE `ads` (
                       `ads_id` int(11) NOT NULL,
                       `ads_ord` int(11) DEFAULT NULL,
                       `ads_positive` int(11) DEFAULT NULL,
                       `ads_negative` int(11) DEFAULT NULL,
                       `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `brand`
--

CREATE TABLE `brand` (
                         `brand_id` int(11) NOT NULL,
                         `brand_name` varchar(30) DEFAULT NULL,
                         `brand_pic` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `brand`
--

INSERT INTO `brand` (`brand_id`, `brand_name`, `brand_pic`) VALUES
                                                                (1, 'Literie d\'amour', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `cart_ref` varchar(30) DEFAULT NULL,
  `cart_date` datetime DEFAULT NULL,
  `cart_status` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `cart`
--

INSERT INTO `cart` (`cart_id`, `cart_ref`, `cart_date`, `cart_status`, `user_id`) VALUES
(1, NULL, '2024-01-17 11:50:58', 1, 5),
(2, NULL, '2024-01-24 15:18:47', 1, 8),
(3, NULL, '2024-01-29 09:44:52', 1, 9),
(4, NULL, '2024-01-29 09:45:58', 1, 10),
(5, NULL, '2024-01-29 09:51:18', 1, 11),
(6, NULL, '2024-01-29 10:09:47', 1, 12),
(7, NULL, '2024-01-29 10:14:33', 1, 13),
(8, NULL, '2024-01-29 10:21:46', 1, 14),
(9, NULL, '2024-01-29 17:59:04', 1, 16),
(10, NULL, '2024-01-29 19:22:42', 1, 18),
(11, NULL, '2024-01-29 19:49:25', 1, 20),
(12, NULL, '2024-01-29 21:52:09', 1, 21),
(13, NULL, '2024-01-29 21:59:38', 1, 22),
(14, NULL, '2024-01-30 13:36:20', 1, 23),
(15, NULL, '2024-01-30 13:38:25', 1, 24),
(16, NULL, '2024-01-30 13:40:10', 1, 25),
(17, NULL, '2024-01-30 14:00:49', 1, 26),
(18, NULL, '2024-01-31 08:32:38', 1, 27),
(19, NULL, '2024-01-31 18:19:27', 1, 29);

-- --------------------------------------------------------

--
-- Structure de la table `cart_p`
--

CREATE TABLE `cart_p` (
  `product_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_qt_c` int(11) DEFAULT NULL,
  `product_price_c` decimal(15,3) DEFAULT NULL,
  `product_info1_c` varchar(50) DEFAULT NULL,
  `product_info2_c` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `cart_p`
--

INSERT INTO `cart_p` (`product_id`, `cart_id`, `product_qt_c`, `product_price_c`, `product_info1_c`, `product_info2_c`) VALUES
(51, 12, 1, 5000.000, NULL, NULL),
(52, 14, 1, 5000.000, NULL, NULL),
(55, 7, 1, 5000.000, NULL, NULL),
(55, 19, 1, 5000.000, NULL, NULL),
(56, 19, 1, 5700.000, NULL, NULL),
(57, 4, 1, 5000.000, NULL, NULL),
(57, 8, 1, 5000.000, NULL, NULL),
(57, 9, 1, 5000.000, NULL, NULL),
(57, 15, 1, 5000.000, NULL, NULL),
(58, 7, 1, 5000.000, NULL, NULL),
(58, 10, 1, 5000.000, NULL, NULL),
(58, 12, 1, 5000.000, NULL, NULL),
(58, 15, 1, 5000.000, NULL, NULL),
(59, 8, 1, 18000.000, NULL, NULL),
(59, 9, 1, 18000.000, NULL, NULL),
(59, 10, 1, 18000.000, NULL, NULL),
(59, 14, 1, 18000.000, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `cat_id` int(11) NOT NULL,
  `cat_name` varchar(200) DEFAULT NULL,
  `cat_pic` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

CREATE TABLE `customer_order` (
  `order_id` int(11) NOT NULL,
  `order_ref` varchar(30) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `order_status` int(11) DEFAULT NULL,
  `order_total_price` decimal(15,3) NOT NULL,
  `order_imgdir` varchar(500) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `delivery_type_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `customer_order`
--

INSERT INTO `customer_order` (`order_id`, `order_ref`, `order_date`, `order_status`, `order_total_price`, `order_imgdir`, `user_id`, `delivery_type_id`) VALUES
(1, NULL, '2023-12-11 13:06:48', 1, 5000.000, NULL, 3, 1),
(2, '2024-00001', '2024-01-15 22:08:34', 1, 5700.000, NULL, 4, 1),
(3, '2024-00002', '2024-01-17 11:56:19', 1, 5000.000, NULL, 5, 1),
(4, '2024-00003', '2024-01-17 11:57:52', 1, 5000.000, NULL, 5, 1),
(5, '2024-00004', '2024-01-17 12:58:01', 1, 5000.000, NULL, 5, 1),
(6, '2024-00005', '2024-01-17 11:58:15', 1, 5000.000, NULL, 5, 1),
(7, '2024-00006', '2024-01-17 22:38:26', 1, 5000.000, NULL, 6, 1),
(8, '2024-00007', '2024-01-18 00:11:13', 1, 5000.000, NULL, 7, 1),
(9, '2024-00008', '2024-01-29 10:45:25', 1, 15700.000, NULL, 9, 1),
(10, '2024-00009', '2024-01-29 10:52:07', 1, 45700.000, NULL, 11, 1),
(11, '2024-00010', '2024-01-29 11:09:54', 1, 41000.000, NULL, 12, 1),
(12, '2024-00011', '2024-01-29 17:58:50', 1, 5000.000, NULL, 15, 1),
(13, '2024-00012', '2024-01-29 19:19:51', 1, 5000.000, NULL, 17, 1),
(14, '2024-00013', '2024-01-29 19:24:23', 1, 5000.000, NULL, 19, 1),
(15, '2024-00014', '2024-01-29 20:50:17', 1, 15000.000, NULL, 20, 1),
(16, '2024-00015', '2024-01-29 23:00:14', 1, 23000.000, NULL, 22, 1),
(17, '2024-00016', '2024-01-30 14:40:27', 1, 23000.000, NULL, 25, 1),
(18, '2024-00017', '2024-01-30 15:01:03', 1, 5000.000, NULL, 26, 1),
(19, '2024-00018', '2024-01-31 09:33:00', 1, 10000.000, NULL, 27, 2),
(20, '2024-00019', '2024-01-31 18:19:00', 1, 5700.000, NULL, 28, 1);

-- --------------------------------------------------------

--
-- Structure de la table `delivery_price`
--

CREATE TABLE `delivery_price` (
  `wilaya_id` int(11) NOT NULL,
  `shop_id` int(11) NOT NULL,
  `delivery_price` decimal(15,3) DEFAULT NULL,
  `delivery_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `delivery_price`
--

INSERT INTO `delivery_price` (`wilaya_id`, `shop_id`, `delivery_price`, `delivery_type_id`) VALUES
(1, 1, 400.000, 1),
(1, 1, 900.000, 2),
(3, 1, 2500.000, 2),
(16, 1, 600.000, 1),
(16, 1, 400.000, 2);

-- --------------------------------------------------------

--
-- Structure de la table `delivery_type`
--

CREATE TABLE `delivery_type` (
  `delivery_type_id` int(11) NOT NULL,
  `delivery_type_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `delivery_type`
--

INSERT INTO `delivery_type` (`delivery_type_id`, `delivery_type_name`) VALUES
(1, 'A domicile'),
(2, 'Point de relais');

-- --------------------------------------------------------

--
-- Structure de la table `details`
--

CREATE TABLE `details` (
  `detail_id` int(11) NOT NULL,
  `detail_name` varchar(200) DEFAULT NULL,
  `detail_ref` varchar(15) DEFAULT NULL,
  `sub_cat_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `details`
--

INSERT INTO `details` (`detail_id`, `detail_name`, `detail_ref`, `sub_cat_id`) VALUES
(1, 'MODELE', NULL, 1),
(2, 'DISPONIBILITE', NULL, 1),
(3, 'COMPOSITION', NULL, 1),
(4, 'option', NULL, 3),
(5, 'MODELE', NULL, 3);

-- --------------------------------------------------------

--
-- Structure de la table `opinion`
--

CREATE TABLE `opinion` (
  `opinion_id` int(11) NOT NULL,
  `opinion_detail` varchar(500) DEFAULT NULL,
  `opinion_star` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `order_p`
--

CREATE TABLE `order_p` (
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_qt_o` int(11) DEFAULT NULL,
  `product_price_o` decimal(15,3) DEFAULT NULL,
  `product_info1_o` varchar(50) DEFAULT NULL,
  `product_info2_o` varchar(50) DEFAULT NULL,
  `product_order_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `order_p`
--

INSERT INTO `order_p` (`product_id`, `order_id`, `product_qt_o`, `product_price_o`, `product_info1_o`, `product_info2_o`, `product_order_status`) VALUES
(51, 7, 1, 5000.000, NULL, NULL, 1),
(51, 8, 1, 5000.000, NULL, NULL, 1),
(51, 9, 1, 5000.000, NULL, NULL, 1),
(51, 15, 1, 5000.000, NULL, NULL, 1),
(51, 16, 1, 5000.000, NULL, NULL, 1),
(52, 15, 1, 5000.000, NULL, NULL, 1),
(53, 10, 1, 5000.000, NULL, NULL, 1),
(54, 10, 4, 5000.000, NULL, NULL, 1),
(54, 15, 1, 5000.000, NULL, NULL, 1),
(55, 10, 1, 5000.000, NULL, NULL, 1),
(55, 19, 1, 5000.000, NULL, NULL, 1),
(56, 2, 1, 5700.000, NULL, NULL, 1),
(56, 9, 1, 5700.000, NULL, NULL, 1),
(56, 10, 1, 5700.000, NULL, NULL, 1),
(56, 20, 1, 5700.000, NULL, NULL, 1),
(57, 4, 1, 5000.000, NULL, NULL, 1),
(57, 5, 1, 5000.000, NULL, NULL, 1),
(57, 10, 1, 5000.000, NULL, NULL, 1),
(57, 11, 1, 5000.000, NULL, NULL, 1),
(57, 12, 1, 5000.000, NULL, NULL, 1),
(57, 17, 1, 5000.000, NULL, NULL, 1),
(58, 1, 1, 5000.000, NULL, NULL, 1),
(58, 3, 1, 5000.000, NULL, NULL, 1),
(58, 6, 1, 5000.000, NULL, NULL, 1),
(58, 9, 1, 5000.000, NULL, NULL, 1),
(58, 10, 1, 5000.000, NULL, NULL, 1),
(58, 13, 1, 5000.000, NULL, NULL, 1),
(58, 14, 1, 5000.000, NULL, NULL, 1),
(58, 18, 1, 5000.000, NULL, NULL, 1),
(58, 19, 1, 5000.000, NULL, NULL, 1),
(59, 11, 2, 18000.000, NULL, NULL, 1),
(59, 16, 1, 18000.000, NULL, NULL, 1),
(59, 17, 1, 18000.000, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `order_stat`
--

CREATE TABLE `order_stat` (
  `stat_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `order_stat_date` datetime DEFAULT NULL,
  `order_stat_comment` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `order_stat`
--

INSERT INTO `order_stat` (`stat_id`, `order_id`, `order_stat_date`, `order_stat_comment`) VALUES
(1, 1, '2023-12-11 13:06:49', NULL),
(1, 2, '2024-01-15 22:08:35', NULL),
(1, 3, '2024-01-17 11:56:19', NULL),
(1, 4, '2024-01-17 11:57:52', NULL),
(1, 5, '2024-01-17 12:58:01', NULL),
(2, 19, '2024-01-31 08:35:24', NULL),
(2, 20, '2024-02-25 10:36:47', NULL),
(3, 9, '2024-02-08 10:34:43', NULL),
(4, 6, '2024-01-18 00:07:47', NULL),
(4, 7, '2024-01-17 23:34:30', NULL),
(4, 8, '2024-01-18 00:12:23', NULL),
(4, 11, '2024-01-29 19:32:51', NULL),
(4, 12, '2024-01-31 13:18:37', NULL),
(4, 14, '2024-01-29 19:25:31', NULL),
(4, 15, '2024-01-29 19:53:09', NULL),
(4, 16, '2024-01-29 22:01:14', NULL),
(5, 10, '2024-01-31 08:34:47', NULL),
(5, 13, '2024-01-29 19:20:49', NULL),
(5, 17, '2024-01-30 13:41:27', NULL),
(5, 18, '2024-03-04 09:42:24', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `privilege`
--

CREATE TABLE `privilege` (
  `priv_id` int(11) NOT NULL,
  `priv_name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_ref` varchar(100) DEFAULT NULL,
  `product_name` varchar(200) DEFAULT NULL,
  `product_desig` varchar(500) DEFAULT NULL,
  `product_qt` int(11) DEFAULT NULL,
  `product_price` decimal(15,2) DEFAULT NULL,
  `product_info1` text,
  `product_info2` text,
  `product_info3` text,
  `product_info4` text,
  `product_info5` text,
  `product_imgdir` varchar(500) DEFAULT NULL,
  `product_pic` varchar(500) DEFAULT NULL,
  `product_imgcount` int(11) DEFAULT NULL,
  `product_rate` float DEFAULT NULL,
  `sub_cat_id` int(11) DEFAULT NULL,
  `brand_id` int(11) DEFAULT NULL,
  `shop_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`product_id`, `product_ref`, `product_name`, `product_desig`, `product_qt`, `product_price`, `product_info1`, `product_info2`, `product_info3`, `product_info4`, `product_info5`, `product_imgdir`, `product_pic`, `product_imgcount`, `product_rate`, `sub_cat_id`, `brand_id`, `shop_id`) VALUES
(51, '0001', 'AUTUM', 'MODELE :        * AUTEM\r\n\r\nDISPONIBILITE : * EN DRAP 7 PIECES  \r\nQT :            * 00000       \r\nCOMPOSITION :\r\n                * 07 Pieces  \r\n                * Drap Plat 2.45*2.35\r\n                * Housse De Matela Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Imprimé', 1021, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
                                                                (52, '0002', 'KHAMSA BOIS DE ROZE', 'MODELE :        * KHAMSA BOIS DE ROZE  \r\nDISPONIBILITE : * EN DRAP 7 PIECES  \r\nQT :            * 00000       \r\nCOMPOSITION :\r\n                * 07 Pieces  \r\n                * Drap Plat 2.45*2.35\r\n                * Housse De Matela Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Imprimé', 0, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 1, 1),
(53, '0002', 'BRIDE', '- COMPOSITION :\r\n                  * 07 pieces  \r\n                  * Drap plat 2.45*2.35\r\n                  * Housse de matela standard \r\n                  * 04 Taies d\'oreiller 70*50\r\n                  * 01 Jeté imprimé', 1, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
                                                                (54, 'ELEGANT', 'ELEGANT', 'ELEGANT', 0, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
                                                                (55, 'KHAMSA GOLD', 'KHAMSA GOLD', 'KHAMSA GOLD', 1, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 1, 1),
                                                                (56, 'INFINITY ROUGE', 'INFINITY ROUGE', 'INFINITY ROUGE', 1, 5700.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
                                                                (57, 'INFINITY VERT', 'INFINITY VERT', 'INFINITY VERT', -1, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
                                                                (58, '0003', 'KHAMSA VERT', 'KHAMSA VERT', -1, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
                                                                (59, 'ROYAL', 'ROYAL', 'ROYAL', -2, 18000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
                                                                (63, 'r450', 'lit', 'lit', 1, 400.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, 1, 1),
                                                                (64, '44545', '4454', '45454', 10, 450.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `product_details`
--

CREATE TABLE `product_details` (
                                   `detail_id` int(11) NOT NULL,
                                   `product_id` int(11) NOT NULL,
                                   `detail_desig` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
                                                                              (3, 59, '* 10 Pieces                     * Drap Plat 2.45*2.35                   * Housse De Matela Standard                    * 04 Taies D\'oreiller 70*50                   * 01 Jeté Imprimé'),
(5, 63, 'royal');

-- --------------------------------------------------------

--
-- Structure de la table `property`
--

CREATE TABLE `property` (
  `property_id` int(11) NOT NULL,
  `property_name` varchar(10) DEFAULT NULL,
  `property_ref` varchar(15) DEFAULT NULL,
  `property_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

CREATE TABLE `property_p` (
  `property_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `property_type`
--

CREATE TABLE `property_type` (
  `property_type_id` int(11) NOT NULL,
  `property_type_name` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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

CREATE TABLE `shop` (
  `shop_id` int(11) NOT NULL,
  `shop_ref` varchar(20) DEFAULT NULL,
  `shop_name` varchar(200) DEFAULT NULL,
  `shop_address` varchar(500) DEFAULT NULL,
  `shop_phone` varchar(15) DEFAULT NULL,
  `shop_email` varchar(50) DEFAULT NULL,
  `shop_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `shop`
--

INSERT INTO `shop` (`shop_id`, `shop_ref`, `shop_name`, `shop_address`, `shop_phone`, `shop_email`, `shop_status`) VALUES
(1, NULL, 'Literie d\'amour', NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Structure de la table `status`
--

CREATE TABLE `status` (
                          `stat_id` int(11) NOT NULL,
                          `stat_name` varchar(30) DEFAULT NULL,
                          `stat_color` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `status`
--

INSERT INTO `status` (`stat_id`, `stat_name`, `stat_color`) VALUES
                                                                (1, 'En cours de validation', 'warning'),
                                                                (2, 'Annulée', 'danger'),
                                                                (3, 'Valider', 'info'),
                                                                (4, 'Récéptionnée', 'success'),
                                                                (5, 'Retour', 'secondary');

-- --------------------------------------------------------

--
-- Structure de la table `sub_category`
--

CREATE TABLE `sub_category` (
                                `sub_cat_id` int(11) NOT NULL,
                                `sub_cat_name` varchar(200) DEFAULT NULL,
                                `sub_cat_pic` varchar(500) DEFAULT NULL,
                                `cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `sub_category`
--

INSERT INTO `sub_category` (`sub_cat_id`, `sub_cat_name`, `sub_cat_pic`, `cat_id`) VALUES
                                                                                       (1, 'Lit double', NULL, 1),
                                                                                       (3, 'Veilleuse', NULL, 3),
                                                                                       (4, 'Tapis', NULL, 4);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
                        `user_id` int(11) NOT NULL,
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
                        `user_status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`user_id`, `user_id_s`, `user_name`, `user_lastname`, `user_address`, `user_phone`, `user_email`, `user_username`, `user_password`, `priv_id`, `wilaya_id`, `user_status`) VALUES
                                                                                                                                                                                                   (1, NULL, 'superadmin', 'superadmin', NULL, NULL, NULL, 'superadmin', '$2b$10$9tuFe9U3koCZWC7Kv3Lrmugfdvq3JoEaeuRqVKngCYCF/NjFIv28q', 1, 16, 1),
                                                                                                                                                                                                   (2, NULL, 'ipa_admin', NULL, NULL, NULL, NULL, 'literiedamour_admin', '$2b$10$H03YUVh/5oQkgZpJc/IoEOCRc0VpiDfrkCKaGSalFOkx.AVOg2leu', 2, 16, 1),
                                                                                                                                                                                                   (3, NULL, 'ZEININNz', 'zineddine', '16565', '0555555555', NULL, NULL, NULL, 5, 1, 1),
                                                                                                                                                                                                   (4, NULL, 'houssam', 'literie', '27 bab el oued', '0555790041', NULL, NULL, NULL, 5, 16, 1),
                                                                                                                                                                                                   (5, '4bf69c5ac70188ca5cea7bf7822f952f', 'Bouchama', 'abdou', 'alger', '055573665', 'abdou16bm@yahoo.fr', 'abdou16bm', '$2b$10$ab0RUT0j5coi3XdPPgSX6.Vu4X593UK.3Iw3s/GxwIO4Hv2swOtB.', 5, 16, 1),
                                                                                                                                                                                                   (6, NULL, 'houssam', 'azzi', 'literie damour', '0555790041', NULL, NULL, NULL, 5, 16, 1),
                                                                                                                                                                                                   (7, NULL, 'Azzi', 'Houssa', 'Literie damour', '0555790041', NULL, NULL, NULL, 5, 16, 1),
                                                                                                                                                                                                   (8, '2e8ddd2a4f84478a16e7545c859aa661', 'tttttttttttttttt', 'ttttttttttttt', 'ttttttttttttttttttt', '0558751140', 'momobks94@gmail.com', 'tttttt', '$2b$10$qTeuCu9lwP1W2J9Z7OhVxOU/n.VaL82hAywZSAdCjKu5itemHU4Fe', 3, 16, 0),
                                                                                                                                                                                                   (9, NULL, 'eeee', 'eeee', 'eeee', '051514515', NULL, NULL, NULL, 5, 1, 1),
                                                                                                                                                                                                   (10, NULL, 'test', 'test', 'test', '0555555', NULL, NULL, NULL, 5, 1, 1),
                                                                                                                                                                                                   (11, NULL, 'zine', 'zine', 'zzz', '0555', NULL, NULL, NULL, 5, 1, 1),
                                                                                                                                                                                                   (12, NULL, 'test', 'test', NULL, '0555555555', NULL, NULL, NULL, 5, 15, 1),
                                                                                                                                                                                                   (13, NULL, 'azzi', 'houssam', NULL, '0666755219', NULL, NULL, NULL, 5, 19, 1),
                                                                                                                                                                                                   (14, NULL, 'zineb', 'tighiouart', NULL, '05123655699', NULL, NULL, NULL, 5, 1, 1),
                                                                                                                                                                                                   (15, NULL, 'Azzi', 'Houssam', NULL, '0555790041', NULL, NULL, NULL, 5, 16, 1),
                                                                                                                                                                                                   (16, NULL, 'Azzi', 'Houssam', NULL, '0555790041', NULL, NULL, NULL, 5, 16, 1),
                                                                                                                                                                                                   (17, NULL, 'Azzi', 'Houssamm', NULL, '0555790041', NULL, NULL, NULL, 5, 16, 1),
                                                                                                                                                                                                   (18, NULL, 'Azzi', 'Houssamm', NULL, '0555790041', NULL, NULL, NULL, 5, 16, 1),
                                                                                                                                                                                                   (19, NULL, 'Azzi01', 'Houssam', NULL, '0555790041', NULL, NULL, NULL, 5, 16, 1),
                                                                                                                                                                                                   (20, NULL, 'Azzi02', 'Houssam', NULL, '0555790041', NULL, NULL, NULL, 5, 16, 1),
                                                                                                                                                                                                   (21, NULL, 'Azzi', 'Houssam', NULL, '0555790041', NULL, NULL, NULL, 5, 16, 1),
                                                                                                                                                                                                   (22, NULL, 'Azzi', 'Houssa', NULL, '0555790041', NULL, NULL, NULL, 5, 16, 1),
                                                                                                                                                                                                   (23, NULL, 'test', 'TEST', NULL, '0555555555', NULL, NULL, NULL, 5, 16, 1),
                                                                                                                                                                                                   (24, NULL, 'TEST', 'TEST', NULL, '45', NULL, NULL, NULL, 5, 1, 1),
                                                                                                                                                                                                   (25, NULL, 'TEST', 'TEST', NULL, '055555', NULL, NULL, NULL, 5, 1, 1),
                                                                                                                                                                                                   (26, NULL, 'Testmobile', 'Testmobile', NULL, '0559764280', NULL, NULL, NULL, 5, 19, 1),
                                                                                                                                                                                                   (27, NULL, 'azzi', 'houssam', NULL, '0666755219', NULL, NULL, NULL, 5, 16, 1),
                                                                                                                                                                                                   (28, NULL, 'Azzi', 'Houssa', NULL, '0555790041', NULL, NULL, NULL, 5, 16, 1),
                                                                                                                                                                                                   (29, NULL, 'Azzi', 'Houssa', NULL, '0555790041', NULL, NULL, NULL, 5, 16, 1);

-- --------------------------------------------------------

--
-- Structure de la table `user_shop`
--

CREATE TABLE `user_shop` (
                             `shop_id` int(11) NOT NULL,
                             `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user_shop`
--

INSERT INTO `user_shop` (`shop_id`, `user_id`) VALUES
    (1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `wilaya`
--

CREATE TABLE `wilaya` (
                          `wilaya_id` int(11) NOT NULL,
                          `wilaya_num` varchar(2) DEFAULT NULL,
                          `wilaya_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
-- Index pour les tables déchargées
--

--
-- Index pour la table `abonnement`
--
ALTER TABLE `abonnement`
    ADD PRIMARY KEY (`abonnement_id`),
  ADD KEY `abonnement_shop_FK` (`shop_id`);

--
-- Index pour la table `ads`
--
ALTER TABLE `ads`
    ADD PRIMARY KEY (`ads_id`),
  ADD KEY `ads_product_FK` (`product_id`);

--
-- Index pour la table `brand`
--
ALTER TABLE `brand`
    ADD PRIMARY KEY (`brand_id`);

--
-- Index pour la table `cart`
--
ALTER TABLE `cart`
    ADD PRIMARY KEY (`cart_id`),
  ADD UNIQUE KEY `cart_user_AK` (`user_id`);

--
-- Index pour la table `cart_p`
--
ALTER TABLE `cart_p`
    ADD PRIMARY KEY (`product_id`,`cart_id`),
  ADD KEY `cart_p_cart0_FK` (`cart_id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
    ADD PRIMARY KEY (`cat_id`);

--
-- Index pour la table `customer_order`
--
ALTER TABLE `customer_order`
    ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_order_user_FK` (`user_id`),
  ADD KEY `delivery_type_id` (`delivery_type_id`);

--
-- Index pour la table `delivery_price`
--
ALTER TABLE `delivery_price`
    ADD PRIMARY KEY (`wilaya_id`,`shop_id`,`delivery_type_id`),
  ADD KEY `delivery_price_shop0_FK` (`shop_id`),
  ADD KEY `delivery_type_id` (`delivery_type_id`);

--
-- Index pour la table `delivery_type`
--
ALTER TABLE `delivery_type`
    ADD PRIMARY KEY (`delivery_type_id`);

--
-- Index pour la table `details`
--
ALTER TABLE `details`
    ADD PRIMARY KEY (`detail_id`),
  ADD KEY `FK_details_sub_category` (`sub_cat_id`);

--
-- Index pour la table `opinion`
--
ALTER TABLE `opinion`
    ADD PRIMARY KEY (`opinion_id`),
  ADD KEY `opinion_product_FK` (`product_id`);

--
-- Index pour la table `order_p`
--
ALTER TABLE `order_p`
    ADD PRIMARY KEY (`product_id`,`order_id`),
  ADD KEY `order_p_customer_order0_FK` (`order_id`);

--
-- Index pour la table `order_stat`
--
ALTER TABLE `order_stat`
    ADD PRIMARY KEY (`stat_id`,`order_id`),
  ADD KEY `order_stat_customer_order0_FK` (`order_id`);

--
-- Index pour la table `privilege`
--
ALTER TABLE `privilege`
    ADD PRIMARY KEY (`priv_id`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
    ADD PRIMARY KEY (`product_id`),
  ADD KEY `product_sub_category_FK` (`sub_cat_id`),
  ADD KEY `product_brand0_FK` (`brand_id`),
  ADD KEY `product_shop_FK` (`shop_id`);

--
-- Index pour la table `product_details`
--
ALTER TABLE `product_details`
    ADD PRIMARY KEY (`detail_id`,`product_id`),
  ADD KEY `product_details_FK1` (`product_id`),
  ADD KEY `product_details_FK2` (`detail_id`);

--
-- Index pour la table `property`
--
ALTER TABLE `property`
    ADD PRIMARY KEY (`property_id`),
  ADD KEY `property_property_type_FK` (`property_type_id`);

--
-- Index pour la table `property_p`
--
ALTER TABLE `property_p`
    ADD PRIMARY KEY (`property_id`,`product_id`),
  ADD KEY `property_p_product0_FK` (`product_id`);

--
-- Index pour la table `property_type`
--
ALTER TABLE `property_type`
    ADD PRIMARY KEY (`property_type_id`);

--
-- Index pour la table `shop`
--
ALTER TABLE `shop`
    ADD PRIMARY KEY (`shop_id`);

--
-- Index pour la table `status`
--
ALTER TABLE `status`
    ADD PRIMARY KEY (`stat_id`);

--
-- Index pour la table `sub_category`
--
ALTER TABLE `sub_category`
    ADD PRIMARY KEY (`sub_cat_id`),
  ADD KEY `sub_category_category_FK` (`cat_id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
    ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_privilege_FK` (`priv_id`),
  ADD KEY `user_wilaya0_FK` (`wilaya_id`);

--
-- Index pour la table `user_shop`
--
ALTER TABLE `user_shop`
    ADD PRIMARY KEY (`shop_id`,`user_id`),
  ADD KEY `user_shop_user0_FK` (`user_id`);

--
-- Index pour la table `wilaya`
--
ALTER TABLE `wilaya`
    ADD PRIMARY KEY (`wilaya_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `abonnement`
--
ALTER TABLE `abonnement`
    MODIFY `abonnement_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `ads`
--
ALTER TABLE `ads`
    MODIFY `ads_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `brand`
--
ALTER TABLE `brand`
    MODIFY `brand_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `cart`
--
ALTER TABLE `cart`
    MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
    MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `customer_order`
--
ALTER TABLE `customer_order`
    MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `delivery_type`
--
ALTER TABLE `delivery_type`
    MODIFY `delivery_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `details`
--
ALTER TABLE `details`
    MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `opinion`
--
ALTER TABLE `opinion`
    MODIFY `opinion_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `privilege`
--
ALTER TABLE `privilege`
    MODIFY `priv_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
    MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT pour la table `property`
--
ALTER TABLE `property`
    MODIFY `property_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `property_type`
--
ALTER TABLE `property_type`
    MODIFY `property_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `shop`
--
ALTER TABLE `shop`
    MODIFY `shop_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `status`
--
ALTER TABLE `status`
    MODIFY `stat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `sub_category`
--
ALTER TABLE `sub_category`
    MODIFY `sub_cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
    MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `user_shop`
--
ALTER TABLE `user_shop`
    MODIFY `shop_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `wilaya`
--
ALTER TABLE `wilaya`
    MODIFY `wilaya_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

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
    ADD CONSTRAINT `customer_order_ibfk_1` FOREIGN KEY (`delivery_type_id`) REFERENCES `delivery_type` (`delivery_type_id`),
  ADD CONSTRAINT `customer_order_user_FK` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Contraintes pour la table `delivery_price`
--
ALTER TABLE `delivery_price`
    ADD CONSTRAINT `delivery_price_ibfk_1` FOREIGN KEY (`wilaya_id`) REFERENCES `wilaya` (`wilaya_id`),
  ADD CONSTRAINT `delivery_price_ibfk_2` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`),
  ADD CONSTRAINT `delivery_price_ibfk_3` FOREIGN KEY (`delivery_type_id`) REFERENCES `delivery_type` (`delivery_type_id`);

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
