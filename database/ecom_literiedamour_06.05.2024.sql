-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : lun. 06 mai 2024 à 10:05
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
-- Base de données : `ecom_literiedamour`
--
CREATE DATABASE IF NOT EXISTS `ecom_literiedamour` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
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
(19, NULL, '2024-01-31 18:19:27', 1, 29),
(20, NULL, '2024-03-07 13:50:42', 1, 31);

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
(2, 'Rideaux et Cache Rideaux', NULL),
(3, 'Décoration de chambre', NULL),
(4, 'Lingerie et Pyjama', NULL),
(5, 'Serviettes Et Sortie De Bain', NULL),
(6, 'Villeuse', NULL);

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
(21, '2024-00001', '2024-03-07 13:44:19', 1, 6800.000, NULL, 30, 1),
(22, '2024-00002', '2024-03-07 14:51:08', 1, 13800.000, NULL, 31, 1),
(23, '2024-00003', '2024-03-07 13:59:28', 1, 6900.000, NULL, 32, 1);

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
(16, 1, 500.000, 1),
(16, 1, 0.000, 2);

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
(5, 'MODELE', NULL, 3),
(6, 'COMPOSITION', NULL, 4),
(7, 'DIMENTION', NULL, 4);

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
(69, 22, 1, 6800.000, NULL, NULL, 1),
(71, 22, 1, 7000.000, NULL, NULL, 1),
(72, 21, 1, 6800.000, NULL, NULL, 1),
(73, 23, 1, 6900.000, NULL, NULL, 1);

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
(3, 21, '2024-03-07 13:44:48', NULL),
(3, 22, '2024-03-07 13:51:27', NULL),
(3, 23, '2024-03-07 13:59:47', NULL);

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
  `brand_id` int(11) DEFAULT NULL,
  `shop_id` int(11) DEFAULT NULL,
  `cat_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`product_id`, `product_ref`, `product_name`, `product_desig`, `product_qt`, `product_price`, `product_info1`, `product_info2`, `product_info3`, `product_info4`, `product_info5`, `product_imgdir`, `product_pic`, `product_imgcount`, `product_rate`, `brand_id`, `shop_id`, `cat_id`) VALUES
(51, '001', 'AUTUM', 'COMPOSITION :\r\n                * 07 Pieces  \r\n                * Drap Plat 2.45*2.35\r\n                * Housse De Matela Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté décoratif\r\nDisponible en Drap', 4, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
(52, '002', 'KHAMSA BOIS DE ROSE', 'COMPOSITION :\r\n                * 07 Pieces  \r\n                * Cache Couette 2.45*2.35\r\n                * Housse De Matelas Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Décoratif\r\nDisponible en Drap et Cache Couette', 2, 6500.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, 1, 1, 1),
(53, '003', 'BRIDE', 'COMPOSITION :\r\n                * 07 Pieces  \r\n                * Drap Plat 2.45*2.35\r\n                * Housse De Matelas Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Décoratif \r\nDisponible en Drap', 0, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
(54, '004', 'ELEGANT', 'COMPOSITION :\r\n                * 07 Pieces  \r\n                * Cache Couette 2.45*2.35\r\n                * Housse De Matelas Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Décoratif \r\nDisponible en Drap et Cache Couette', 8, 6800.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
(55, '005', 'KHAMSA GOLD', 'COMPOSITION :\r\n                * 07 Pieces  \r\n                * Cache couette 2.45*2.35\r\n                * Housse De Matelas Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Décoratif \r\nDisponible en Drap et Cache Couette', 19, 6500.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, 1, 1, 1),
(56, '006', 'INFINITY ROUGE', 'COMPOSITION :\r\n                * 07 Pieces  \r\n                * Cache Couette 2.45*2.35\r\n                * Housse De Matelas Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Décoratif \r\nDisponible en Drap et Cache Couette', 0, 7000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
(57, '007', 'INFINITY VERT', 'COMPOSITION :\r\n                * 07 Pieces  \r\n                * Cache Couette 2.45*2.35\r\n                * Housse De Matelas Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Décoratif \r\nDisponible en Drap et Cache Couette', 8, 7000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
(58, '008', 'KHAMSA VERT', 'COMPOSITION :\r\n                * 07 Pieces  \r\n                * Cache Couette 2.45*2.35\r\n                * Housse De Matelas Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Décoratif \r\nDisponible en Drap et Cache Couette', 3, 6200.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
(59, '009', 'ROYAL', 'COMPOSITION :\r\n                * 07 Pieces  \r\n                * Couvre Lit 2.45*2.35\r\n                * Housse De Matelas Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Décoratif', 3, 18000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
(69, '010', 'CELOSIE', 'Composition Cache Couette 7 Pieces', 16, 6800.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
(70, '011', 'JUNGLE BEIGE', 'COMPOSITION :\r\n                * 07 Pieces  \r\n                * Cache Couette 2.45*2.35\r\n                * Housse De Matelas Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Décoratif \r\nTissue Cotton\r\nDisponible en Cache Couette', 10, 7000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6, NULL, 1, 1, 1),
(71, '012', 'JUNGLE VERT', 'Composition \r\nCache Couette 7 Pieces   240*240\r\nHousse  Matelas                250*250\r\n4 Taies D\'oreiller                   70*50\r\nJeté Décoratif                       40*40\r\nTissue Cotton\r\nDisponible en Cache Couette', 8, 7000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
(72, '013', 'FLORAL', 'COMPOSITION :\r\n                * 07 Pieces  \r\n                * Cache Couette 2.45*2.35\r\n                * Housse De Matelas Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Décoratif \r\nDisponible en Drap et Cache Couette', 3, 6800.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
(73, '014', 'BERBER BLACK', 'Composition cache couette 7 Pieces', 47, 6900.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6, NULL, 1, 1, 1),
(74, '015', 'COEUR JAUNE', 'Composition Cache Couette 7 Pieces', 0, 4800.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, 1, 1, 1),
(75, '016', 'LEOPARD', 'COMPOSITION :\r\n                * 07 Pieces  \r\n                * Cache Couette 2.45*2.35\r\n                * Housse De Matelas Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Décoratif \r\nDisponible en Cache Couette', 0, 7000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8, NULL, 1, 1, 1),
(76, '017', 'BLEU SISI', 'COMPOSITION :\r\n                * 07 Pieces  \r\n                * Drap Plat  2.45*2.35\r\n                * Housse De Matelas Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Décoratif \r\nDisponible en Drap', 2, 4500.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
(77, '018', 'BERBER BLEU', 'COMPOSITION :\r\n                * 07 Pieces  \r\n                * Cache Couette 2.45*2.35\r\n                * Housse De Matelas Standard \r\n                * 04 Taies D\'oreiller 70*50\r\n                * 01 Jeté Décoratif \r\nDisponible en Drap et Cache Couette', 0, 6900.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
(78, '019', 'TROPICAL', 'COMPOSITION :\r\n* 04 Pieces\r\n* Drap Plat 2.45*2.35\r\n* 02 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Drap 4 Pieces', 4, 2800.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, 1, 1, 1),
(80, '020', 'LAVENDRE', 'COMPOSITION :\r\n* 07 Pieces\r\n* Cache Couette 2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Drap et Cache Couette', 4, 6800.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6, NULL, 1, 1, 1),
(81, '021', 'BUTERFLY', 'COMPOSITION :\r\n* 07 Pieces\r\n* Cache Couette 2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Drap et Cache Couette', 0, 6800.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, 1, 1, 1),
(83, '022', 'VINTAGE', 'COMPOSITION :\r\n* 07 Pieces\r\n* Cache Couette 2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Drap et Cache Couette', 6, 7200.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
(84, '023', 'BARBIE', 'COMPOSITION :\r\n* 07 Pieces\r\n* Cache Couette 2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Drap et Cache Couette', 2, 7000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6, NULL, 1, 1, 1),
(85, '024', 'FLAME BLLEU', 'COMPOSITION :\r\n* 07 Pieces\r\n* Cache Couette 2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Cache Couette', 0, 7000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
(86, '025', 'AUTEM', 'COMPOSITION :\r\n* 07 Pieces\r\n* Cache Couette 2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Drap et Cache Couette', 0, 5000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, 1, 1, 1),
(87, '026', 'LEOPARD CHANEL', 'COMPOSITION :\r\n* 07 Pieces\r\n* Cache Couette 2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Drap et Cache Couette', 6, 7000.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, 1, 1, 1),
(88, '027', 'LAVENDRE', 'COMPOSITION :\r\n* 07 Pieces\r\n* Couvre Lit 2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Couvre lit', 0, 6500.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
(90, '028', 'MARGUERITE', 'COMPOSITION :\r\n* 07 Pieces\r\n* Drap Plat 2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Drap', 0, 4500.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, 1, 1, 1),
(91, '029', 'COEUR', 'COMPOSITION :\r\n* 07 Pieces\r\n* Cache Couette 2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Drap et Cache Couette', 6, 6800.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, 1, 1, 1),
(92, '030', 'FEUILLE D\'OR', 'COMPOSITION :\r\n* 04 Pieces\r\n* Drap Plat 2.45*2.35\r\n* 0é Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Drap', 0, 2800.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
(93, '031', 'MARIN', 'COMPOSITION :\r\n* 07 Pieces\r\n* Cache Couette 2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Cache Couette', 0, 8500.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, 1, 1, 1),
(94, '031', 'MARGUERIT SOMON', 'COMPOSITION :\r\n* 07 Pieces\r\n* Drap Plat2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Drap', 0, 4500.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, 1, 1, 1),
(95, '032', 'LAVENDRE BOOTY', 'COMPOSITION :\r\n* 07 Pieces\r\n* Couvre Lit 2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Couvre Lit', 0, 6500.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 4, NULL, 1, 1, 1),
(96, '033', 'Promesse de Fleurs', 'COMPOSITION :\r\n* 07 Pieces\r\n* Couvre Lit 2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Couvre Lit', 0, 6500.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 3, NULL, 1, 1, 1),
(97, '034', 'PAULINE', 'COMPOSITION :\r\n* 07 Pieces\r\n* Drap Plat 2.45*2.35\r\n* Housse De Matelas Standard\r\n* 04 Taies D\'oreiller 70*50\r\n* 01 Jeté Décoratif\r\nDisponible en Drap', 0, 2800.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 2, NULL, 1, 1, 1);

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
(3, 69, 'Cache couette 7 pieces composée de :');

-- --------------------------------------------------------

--
-- Structure de la table `product_sub_cat`
--

CREATE TABLE `product_sub_cat` (
  `product_id` int(11) NOT NULL,
  `sub_cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `product_sub_cat`
--

INSERT INTO `product_sub_cat` (`product_id`, `sub_cat_id`) VALUES
(52, 1),
(54, 1),
(55, 1),
(56, 1),
(57, 1),
(58, 1),
(69, 1),
(70, 1),
(71, 1),
(72, 1),
(73, 1),
(75, 1),
(77, 1),
(80, 1),
(81, 1),
(83, 1),
(84, 1),
(85, 1),
(87, 1),
(91, 1),
(93, 1),
(51, 3),
(53, 3),
(56, 3),
(74, 3),
(76, 3),
(78, 3),
(86, 3),
(90, 3),
(91, 3),
(92, 3),
(94, 3),
(97, 3),
(88, 21),
(95, 21),
(96, 21);

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
(1, 'Cache Couette', NULL, 1),
(3, 'Drap', NULL, 1),
(4, 'Lit Une Places et Demi', NULL, 1),
(9, 'Literie De Luxe', NULL, 1),
(10, 'Trousseau Bébé', NULL, 1),
(11, 'Matelas', NULL, 1),
(19, 'pygama armani 02', NULL, 4),
(21, 'COUVRE LIT', NULL, 1),
(22, 'Villeuse', NULL, 6);

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
(29, NULL, 'Azzi', 'Houssa', NULL, '0555790041', NULL, NULL, NULL, 5, 16, 1),
(30, NULL, 'HYDRA', 'HYDRA', NULL, '0554236943', NULL, NULL, NULL, 5, 16, 1),
(31, NULL, '14 CHEMIN ROMAIN BIRKHADEM', 'BIRKHADEM', NULL, '0542171683', NULL, NULL, NULL, 5, 16, 1),
(32, NULL, 'BORDJ EL KIFAN', 'BORDJ EL KIFAN', NULL, '0665812558', NULL, NULL, NULL, 5, 16, 1);

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
  ADD KEY `product_brand0_FK` (`brand_id`),
  ADD KEY `product_shop_FK` (`shop_id`),
  ADD KEY `cat_id` (`cat_id`);

--
-- Index pour la table `product_details`
--
ALTER TABLE `product_details`
  ADD PRIMARY KEY (`detail_id`,`product_id`),
  ADD KEY `product_details_FK1` (`product_id`),
  ADD KEY `product_details_FK2` (`detail_id`);

--
-- Index pour la table `product_sub_cat`
--
ALTER TABLE `product_sub_cat`
  ADD PRIMARY KEY (`product_id`,`sub_cat_id`),
  ADD KEY `sub_cat_id` (`sub_cat_id`);

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
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `customer_order`
--
ALTER TABLE `customer_order`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `delivery_type`
--
ALTER TABLE `delivery_type`
  MODIFY `delivery_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `details`
--
ALTER TABLE `details`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

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
  MODIFY `sub_cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

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
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `category` (`cat_id`);

--
-- Contraintes pour la table `product_details`
--
ALTER TABLE `product_details`
  ADD CONSTRAINT `product_details_FK1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `product_details_FK2` FOREIGN KEY (`detail_id`) REFERENCES `details` (`detail_id`);

--
-- Contraintes pour la table `product_sub_cat`
--
ALTER TABLE `product_sub_cat`
  ADD CONSTRAINT `product_sub_cat_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `product_sub_cat_ibfk_2` FOREIGN KEY (`sub_cat_id`) REFERENCES `sub_category` (`sub_cat_id`);

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
