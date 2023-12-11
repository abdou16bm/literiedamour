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

DROP DATABASE IF EXISTS `ecom_literiedamour`;

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
    ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.brand : ~2 rows (environ)

DELETE FROM `brand`;

INSERT INTO
    `brand` (
        `brand_id`,
        `brand_name`,
        `brand_pic`
    )
VALUES (1, 'Iphone', NULL), (2, 'Samsung', NULL);

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

-- Listage des données de la table ecom_literiedamour.category : ~0 rows (environ)

DELETE FROM `category`;

INSERT INTO
    `category` (
        `cat_id`,
        `cat_name`,
        `cat_pic`
    )
VALUES (1, 'Ipa', NULL);

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

-- Listage des données de la table ecom_literiedamour.delivery_price : ~1 rows (environ)

DELETE FROM `delivery_price`;

INSERT INTO
    `delivery_price` (
        `wilaya_id`,
        `shop_id`,
        `delivery_price`
    )
VALUES (16, 1, 600.000);

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
    ) ENGINE = InnoDB AUTO_INCREMENT = 18 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.details : ~0 rows (environ)

DELETE FROM `details`;

INSERT INTO
    `details` (
        `detail_id`,
        `detail_name`,
        `detail_ref`,
        `sub_cat_id`
    )
VALUES (1, 'Marque', NULL, 1), (2, 'Type d\'écran', NULL, 1), (
        3,
        'Taille de l\'affichage',
        NULL,
        1
    ), (4, 'Épaisseur', NULL, 1), (
        5,
        'Dimensions (largeur x longueur)',
        NULL,
        1
    ), (6, 'Poids', NULL, 1), (
        7,
        'Résistants à l\'eau',
        NULL,
        1
    ), (
        8,
        'Couleurs d\'affichage',
        NULL,
        1
    ), (
        9,
        'Version du système',
        NULL,
        1
    ), (10, 'CPU', NULL, 1), (11, 'GPU', NULL, 1), (12, 'Mémoire RAM', NULL, 1), (13, 'Stockage interne', NULL, 1), (14, 'Double Sim', NULL, 1), (15, 'Appareil photo', NULL, 1), (16, 'Caméra frontal', NULL, 1), (
        17,
        'Capacité batterie',
        NULL,
        1
    );

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
    ) ENGINE = InnoDB AUTO_INCREMENT = 51 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.product : ~45 rows (environ)

DELETE FROM `product`;

INSERT INTO
    `product` (
        `product_id`,
        `product_ref`,
        `product_name`,
        `product_desig`,
        `product_qt`,
        `product_price`,
        `product_info1`,
        `product_info2`,
        `product_info3`,
        `product_info4`,
        `product_info5`,
        `product_imgdir`,
        `product_pic`,
        `product_imgcount`,
        `product_rate`,
        `sub_cat_id`,
        `brand_id`,
        `shop_id`
    )
VALUES (
        1,
        'Montre Intelligente',
        'Haylou Rs4 plus - Montre Intelligente',
        'Montre Intelligente - Bluetooth V5.1 - Écran Amoled 1,78"',
        3,
        15100.00,
        'Après trois mois de lancement de la montre intelligente Haylou RS3 , la sous-marque Haylou-Xiaomi est de retour et a lancé une nouvelle montre intelligente de marque appelée Haylou RS4 plus . Le portable est un  de fitness qui a un design carré avec un écran AMOLED de 1,78 pouce et est équipé d\'un moniteur de fréquence cardiaque, d\'un moniteur d\'oxygène dans le sang Spo2, de 12 modes sportifs, IP68 étanche',
        'Contrairement à la montre intelligente RS3 qui a un design circulaire, cette nouvelle montre RS4 plus se présente sous une forme carrée qui a l\'air sportive, élégante et adaptée aux hommes et aux femmes. Mesurant 45,2 * 37,2 * 11,1 mm et pesant environ 48,6 g. Il y a un bouton physique sur le côté droit du boîtier. Il est responsable de la fonction de mise en marche. Le verso de l\'appareil a reçu une configuration typique - il y a des contacts magnétiques pour le chargement et un capteur de fréquence cardiaque.\r\n\r\nLe corps de la montre intelligente RS4 est en métal tandis que le bracelet est disponible en silicone. Concernant l\'écran d\'affichage ! Cette montre Xiaomi Haylou RS4 plus dispose d\'un écran rétine tactile de 1,78 pouce incurvé avec du verre 2.5D et créé avec une résolution de 368 x 448 pixels. Ce portable est également emballé avec une variété de cadrans de montre et prend en charge des cadrans personnalisés.\r\nSKU: HA530EA0TZ1ZKNAFAMZ\r\nModèle: Haylou RS4 Plus\r\nTaille (Longueur x Largeur x Hauteur cm): 45.2 * 37.2 * 11.1 mm\r\nPoids (kg): 48.6\r\nCouleur: Noir',
        '',
        NULL,
        NULL,
        '/img/catalog/product/1',
        '/img/catalog/product/1/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        2,
        'MA1002',
        'ASUS ZENBOOK DUO',
        'UX481F INTEL CORE I5-10210U – 8GO – SSD 512GO M.2 NVME – 14,0? FHD – GEFORCE MX250',
        3,
        215000.00,
        'Avec le ZenBook Duo, créativité et productivité prennent un tout nouveau sens ! Conçu pour perfectionner la gestion de votre flux de tâches, le ZenBook Duo arbore un design unique rehaussé d’un écran secondaire ASUS ScreenPad™ Plus en harmonie avec l’écran principal. Exploiter votre puissance créative n’a jamais été aussi simple.',
        'INFORMATIONS GÉNÉRALES :\r\nDésignation : ZenBook Duo UX481\r\nMarque : ASUS\r\nModèle : UX481F\r\n\r\nProcesseur :\r\nType de processeur : Processeur Intel® Core™ i5-10210U 1,6 GHz (6 Mo de cache, jusqu’à 4,2 GHz, 4 cœurs)\r\nProcesseur : Intel Core i5\r\nFréquence CPU : 4,2 GHz\r\n\r\nMémoire : 8 Go LPDDR3\r\nType de mémoire : DDR3\r\nFréquence(s) Mémoire : DDR3 2133MHz\r\nCapacité maximale de RAM : 16 Go\r\n\r\nStockage : Configuration disque(s) SSD 512 Go\r\nDisque dur : SSD 512 Go\r\nType de Disque Système : SSD (Solid State Drive)\r\nInterface avec l’ordinateur disque dur système : M.2 NVMe™ PCIe® 3.0\r\nLecteur Optique : Oui\r\n\r\nCarte graphique : Intel® UHD 620 Carte graphique\r\nModèle de la carte graphique : NVIDIA® GeForce® MX250\r\nCarte graphique : NVIDIA® GeForce® MX250\r\nMémoire vidéo dédiée : 2 Go\r\nType mémoire vidéo : GDDR5\r\nAffichage :\r\n14,0 pouces, FHD (1920 x 1080) 16:9, panneau de niveau IPS, rétroéclairage LED, 300 nits, gamme de couleurs 100 % sRGB pour non-OLED, PANTONE validé, anti- écran éblouissant, Écran tactile, Avec support stylet, Rapport écran/corps : 90 %\r\n\r\nSystème opérateur :\r\nWindows 10 Pro – ASUS recommande Windows 10 Pro pour les entreprises\r\n\r\nPorts : d’E/S\r\n1x USB 3.2 Gen 1 Type-A\r\n1x USB 3.2 Gen 2 Type-A\r\n1x USB 3.2 Gen 2 Type-C\r\n1x HDMI 1.4\r\n1x prise audio combo 3,5 mm 1x lecteur de carte Micro SD\r\nDC-in\r\n\r\nClavier et pavé tactile : Clavier chiclet rétroéclairé, course des touches de 1,4 mm\r\n\r\nCaméra : Caméra HD avec fonction IR pour prendre en charge Windows Hello\r\n\r\nl’audio :\r\nAudio par ICEpower®\r\nSmart Amp Technology Haut\r\n-parleur\r\nintégré Microphone\r\nharman/kardon intégré (Premium)\r\navec prise en charge de la reconnaissance vocale Cortana et Alexa\r\n\r\nRéseau et communication : Wi-Fi 6 (802.11ax) (double bande) 2*2 + Bluetooth 5.0\r\n\r\nLa batterie : 70 Wh, 4S1P, Li-ion 4 cellules\r\n\r\nSource de courant Adaptateur secteur ø4,5, 65 W, sortie : 19 V CC, 3,42 A, 65 W, entrée : 100 ~ 240 V CA 50/60 Hz universel\r\n\r\nLester : 1,50 kg (3,31 livres)\r\nDimensions (L x P x H) : 32,30 x 22,30 x 1,99 ~ 1,99 cm (12,72? x 8,78? x 0,78? ~ 0,78?)',
        '',
        NULL,
        NULL,
        '/img/catalog/product/2',
        '/img/catalog/product/2/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        3,
        'MA1008',
        'Tablette tactile - SAMSUNG Galaxy Tab A8 - 10,5" - RAM 3Go - Stockage 32Go - Android 11 - Argent - WiFi',
        'SAMSUNG Galaxy Tab A8',
        4,
        9000.00,
        'Tablette tactile - SAMSUNG Galaxy Tab A8 - 10,5" - RAM 3Go - Stockage 32Go - Android 11 - Argent - WiFi',
        'Tablette tactile - SAMSUNG Galaxy Tab A8 - 10,5" - RAM 3Go - Stockage 32Go - Android 11 - Argent - WiFi',
        'Disponible',
        NULL,
        NULL,
        '/img/catalog/product/3',
        '/img/catalog/product/3/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        4,
        'MA1005',
        'SAMSUNG GALAXY TAB ',
        'SAMSUNG GALAXY TAB ',
        5,
        16500.00,
        'Tablette tactile SAMSUNG GALAXY TAB A8 WIFI 128GO ANTHRACITE',
        'Tablette tactile SAMSUNG GALAXY TAB A8 WIFI 128GO ANTHRACITE',
        '',
        NULL,
        NULL,
        '/img/catalog/product/4',
        '/img/catalog/product/4/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        5,
        'MA1057',
        'Samsung UE85AU7105 - TV LED UHD 4K',
        'Samsung UE85AU7105 - TV LED UHD 4K',
        10,
        80000.00,
        'Samsung UE85AU7105 - TV LED UHD 4K - 85\'\' (214cm) - HDR10+ - Smart TV - Dolby Digital Plus - 3 x HDMI - 1 x USB - Classe F',
        'Samsung UE85AU7105 - TV LED UHD 4K - 85\'\' (214cm) - HDR10+ - Smart TV - Dolby Digital Plus - 3 x HDMI - 1 x USB - Classe F',
        '',
        NULL,
        NULL,
        '/img/catalog/product/5',
        '/img/catalog/product/5/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        6,
        'MA1020',
        'Xbox One S',
        'Xbox One S',
        5,
        68000.00,
        'Xbox One S',
        'Xbox One S',
        'Xbox One S',
        NULL,
        NULL,
        '/img/catalog/product/6',
        '/img/catalog/product/6/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        11,
        'MA1020',
        'Casque audio Beats',
        'Casque audio Beats',
        4,
        6800.00,
        'Casque à réduction de bruit Beats Studio3',
        'Casque à réduction de bruit Beats Studio3',
        '',
        NULL,
        NULL,
        '/img/catalog/product/11',
        '/img/catalog/product/11/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        13,
        'PCB025',
        'PC Gaming HP Pavilion TG01-1101nf',
        'PC Gaming HP Pavilion TG01-1101nf',
        4,
        980000.00,
        'PC Gaming HP Pavilion TG01-1101nf Intel Core i5 8 Go RAM 512 Go SSD Noir céleste\r\n',
        'PC Gaming HP Pavilion TG01-1101nf Intel Core i5 8 Go RAM 512 Go SSD Noir céleste\r\n',
        '',
        NULL,
        NULL,
        '/img/catalog/product/13',
        '/img/catalog/product/13/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        14,
        'IMP485',
        'Imprimante multifonction CANON TS6350A',
        'Imprimante multifonction CANON TS6350A',
        5,
        48900.00,
        'Avec la fonction sans fil, imprimez, copiez, numérisez\r\nUn design intelligent pour une grande flexibilité grâce à une barre d\'état intuitive à LED, 5 cartouches d\'encre individuelles\r\nConnectez-vous au Cloud grâce à l\'application Canon PRINT ou imprimez à l\'aide d\'AirPrint (iOS) et Mopria (Android)\r\nProfitez d\'une configuration rapide grâce à des commandes intuitives via un écran OLED 3,6 cm',
        'Avec la fonction sans fil, imprimez, copiez, numérisez\r\nUn design intelligent pour une grande flexibilité grâce à une barre d\'état intuitive à LED, 5 cartouches d\'encre individuelles\r\nConnectez-vous au Cloud grâce à l\'application Canon PRINT ou imprimez à l\'aide d\'AirPrint (iOS) et Mopria (Android)\r\nProfitez d\'une configuration rapide grâce à des commandes intuitives via un écran OLED 3,6 cm',
        '',
        NULL,
        NULL,
        '/img/catalog/product/14',
        '/img/catalog/product/14/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        15,
        'USB454',
        'Clé USB VERBATIM STORE N\' GO PINSTRIPE USB 2.0 128GO',
        'Clé USB VERBATIM STORE N\' GO PINSTRIPE USB 2.0 128GO',
        6,
        2500.00,
        'Clé USB VERBATIM STORE N\' GO PINSTRIPE USB 2.0 128GO\r\n',
        'Clé USB VERBATIM STORE N\' GO PINSTRIPE USB 2.0 128GO\r\n',
        '',
        NULL,
        NULL,
        '/img/catalog/product/15',
        '/img/catalog/product/15/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        16,
        'CS4548',
        'Clavier STEELSERIES APEX PRO GAMING',
        'Clavier STEELSERIES APEX PRO GAMING',
        15,
        5800.00,
        'Clavier STEELSERIES APEX PRO GAMING',
        'Clavier STEELSERIES APEX PRO GAMING',
        '',
        NULL,
        NULL,
        '/img/catalog/product/16',
        '/img/catalog/product/16/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        17,
        'SR4859',
        'Souris LOGITECH',
        'Souris LOGITECH',
        50,
        4500.00,
        'Souris LOGITECH SOURIS GAMING FILAIRE LOGITECH G PRO HERO\r\n',
        'Souris LOGITECH SOURIS GAMING FILAIRE LOGITECH G PRO HERO\r\n',
        '',
        NULL,
        NULL,
        '/img/catalog/product/17',
        '/img/catalog/product/17/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        18,
        'CG4585',
        'Carte graphique MSI CARTE ',
        'Carte graphique MSI CARTE ',
        100,
        48500.00,
        'Carte graphique MSI CARTE GRAPHIQUE - - GEFORCE RTX 3060 TI GAMING X 8G LHR - 8 GO - GDDR6 - PCIE 4.0 - HDMI / 3 X DISPLAYPORT (912-V397-230)\r\n',
        'Carte graphique MSI CARTE GRAPHIQUE - - GEFORCE RTX 3060 TI GAMING X 8G LHR - 8 GO - GDDR6 - PCIE 4.0 - HDMI / 3 X DISPLAYPORT (912-V397-230)\r\n',
        '',
        NULL,
        NULL,
        '/img/catalog/product/18',
        '/img/catalog/product/18/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        19,
        'TP8768',
        'Routeur TP LINK 4G ',
        'Routeur TP LINK 4G ',
        6,
        5800.00,
        'Routeur TP LINK 4G WIFI BI-BANDE ARCHER MR200 V4',
        'Routeur TP LINK 4G WIFI BI-BANDE ARCHER MR200 V4',
        '',
        NULL,
        NULL,
        '/img/catalog/product/19',
        '/img/catalog/product/19/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        20,
        'FA567',
        ' PC PORTABLE DELL VOSTRO 3400 I3 11È GÉN 4GO 1TO - NOIR',
        ' PC PORTABLE DELL VOSTRO 3400 I3 11È GÉN 4GO 1TO - NOIR',
        78,
        159999.00,
        'Écran 14" HD - Processeur: Intel Core i3-1115G4 (3.00 GHz up to 4,10 GHz Turbo max , 6 Mo de mémoire cache, Dual-Core) - Système d\'exploitation: FreeDos - Mémoire RAM: 4 Go - Disque dur: 1 To HDD - Carte graphique: Intel HD Graphics avec WiFi, Bluetooth, 1x USB 2.0 Type-A, 2x USB 3.2 Gen 1 Type-A, 1x HDMI 1.4,1x RJ-45, 1 prise jack pour casque 3.5 mm - Couleur: Noir - Garantie: 1 a',
        'Écran 14" HD - Processeur: Intel Core i3-1115G4 (3.00 GHz up to 4,10 GHz Turbo max , 6 Mo de mémoire cache, Dual-Core) - Système d\'exploitation: FreeDos - Mémoire RAM: 4 Go - Disque dur: 1 To HDD - Carte graphique: Intel HD Graphics avec WiFi, Bluetooth, 1x USB 2.0 Type-A, 2x USB 3.2 Gen 1 Type-A, 1x HDMI 1.4,1x RJ-45, 1 prise jack pour casque 3.5 mm - Couleur: Noir - Garantie: 1 a',
        'Disponible',
        NULL,
        NULL,
        '/img/catalog/product/20',
        '/img/catalog/product/20/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        21,
        'EP098',
        'ÉCOUTEURS SANS FIL I9S PRO BLUETOOTH - ROUGE',
        'ÉCOUTEURS SANS FIL I9S PRO BLUETOOTH - ROUGE',
        8,
        4500.00,
        'Écouteurs Sans Fil Earbuds I9S Pro - Technologie de connectivité: Bluetooth 5.0 - Distance de fonctionnement: 10m - Sensibilité: 42dBm - Capacité de la batterie: 30 mAh - Capacité de la boîte de recharge: 500 mAh - Temps de travail: 5-6 heures - Autonomie en veille: 100 heures - Temps de charge: 50 minutes - Couleur: Rouge - Garantie: 1an',
        'Écouteurs Sans Fil Earbuds I9S Pro - Technologie de connectivité: Bluetooth 5.0 - Distance de fonctionnement: 10m - Sensibilité: 42dBm - Capacité de la batterie: 30 mAh - Capacité de la boîte de recharge: 500 mAh - Temps de travail: 5-6 heures - Autonomie en veille: 100 heures - Temps de charge: 50 minutes - Couleur: Rouge - Garantie: 1an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/21',
        '/img/catalog/product/21/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        22,
        'DL4020',
        'PC PORTABLE ASUS E210MA INTEL CELERON N4020 4GO 128 GO EMMC- BLEU',
        'PC PORTABLE ASUS E210MA INTEL CELERON N4020 4GO 128 GO EMMC- BLEU',
        60,
        980000.00,
        'Écran 11.6" HD - Processeur: Intel Celeron N4020 (1,10 GHz up to 2.80 GHz, 4 Mo de mémoire cache, Dual-Core)- Système d\'exploitation: Windows 11 - Mémoire RAM: 4 Go DDR4 - Disque Dur: 128 Go eMMC - Carte Graphique: Intel HD Graphics avec Wi-Fi, Bluetooth, USB 3.2 Gen 1 Type-C, USB 3.2 Gen 1 Type-A, USB 2.0 Type-A, HDMI 1.4 - Clavier Chiclet Avec NumPad - Couleur: Bleu - Garantie: 1 an',
        'Écran 11.6" HD - Processeur: Intel Celeron N4020 (1,10 GHz up to 2.80 GHz, 4 Mo de mémoire cache, Dual-Core)- Système d\'exploitation: Windows 11 - Mémoire RAM: 4 Go DDR4 - Disque Dur: 128 Go eMMC - Carte Graphique: Intel HD Graphics avec Wi-Fi, Bluetooth, USB 3.2 Gen 1 Type-C, USB 3.2 Gen 1 Type-A, USB 2.0 Type-A, HDMI 1.4 - Clavier Chiclet Avec NumPad - Couleur: Bleu - Garantie: 1 an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/22',
        '/img/catalog/product/22/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        23,
        'TP690',
        'RÉPÉTEUR D-LINK DAP?1325 N300 + 1 PORT FAST ETHERNET SANS FIL',
        'RÉPÉTEUR D-LINK DAP?1325 N300 + 1 PORT FAST ETHERNET SANS FIL',
        78,
        5000.00,
        'Répéteur D-LINK DAP?1325 - Connectivité: Sans Fil (Wifi)- Norme réseau: 802.11n/g Wireless LAN - Vitesse sans fil: 300 Mbps 2.4 GHz - Sécurité : Wi-Fi Protected Access (WPA/WPA2) , WPS (PBC) - Types d\'antennes: 2 antennes omnidirectionnelles fixes - Interface filaire: 1 x Fast Ethernet LAN 10/100 Mbps - Alimentation: 110 à 240 V CA, 50/60 Hz - Dimensions: 97,9 x 50,7 x 48,7 mm - Poids: 97 gr\r\n\r\n',
        'Répéteur D-LINK DAP?1325 - Connectivité: Sans Fil (Wifi)- Norme réseau: 802.11n/g Wireless LAN - Vitesse sans fil: 300 Mbps 2.4 GHz - Sécurité : Wi-Fi Protected Access (WPA/WPA2) , WPS (PBC) - Types d\'antennes: 2 antennes omnidirectionnelles fixes - Interface filaire: 1 x Fast Ethernet LAN 10/100 Mbps - Alimentation: 110 à 240 V CA, 50/60 Hz - Dimensions: 97,9 x 50,7 x 48,7 mm - Poids: 97 gr\r\n\r\n',
        '',
        NULL,
        NULL,
        '/img/catalog/product/23',
        '/img/catalog/product/23/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        24,
        'CL098',
        'MINI CLAVIER SANS FIL QWERTY AVEC TOUCHPAD POUR SMART TV',
        'MINI CLAVIER SANS FIL QWERTY AVEC TOUCHPAD POUR SMART TV',
        9,
        2400.00,
        'Mini Clavier Sans Fil QWERTY Avec Touchpad - Technologie de Connectivité: Sans Fil - Plage de fonctionnement: Jusqu\'à 10 mètres - Interface de Connectivité: Micro USB 2.4 GHz - Touches: Touches pleine grandeur, Touche de fonction multimédia, Touchpad DPI fonctions réglables - Prise en charge de la barre de défilement et de défilement multi-touch - Puissance d\'entrée: 5V - Voltage: 3.3V - Batterie: Lithium-ion - Puissance Batterie: 300 mA - Compatible avec: tablette, smartphone, Smart TV, consoles de jeux, Android TV Box, Xbox 360, PS3, HTPC, IPTV, Pad - Systéme d\'exploitation: Android, iOS, Linux, Windows, Mac OS - Couleur: Noir',
        'Mini Clavier Sans Fil QWERTY Avec Touchpad - Technologie de Connectivité: Sans Fil - Plage de fonctionnement: Jusqu\'à 10 mètres - Interface de Connectivité: Micro USB 2.4 GHz - Touches: Touches pleine grandeur, Touche de fonction multimédia, Touchpad DPI fonctions réglables - Prise en charge de la barre de défilement et de défilement multi-touch - Puissance d\'entrée: 5V - Voltage: 3.3V - Batterie: Lithium-ion - Puissance Batterie: 300 mA - Compatible avec: tablette, smartphone, Smart TV, consoles de jeux, Android TV Box, Xbox 360, PS3, HTPC, IPTV, Pad - Systéme d\'exploitation: Android, iOS, Linux, Windows, Mac OS - Couleur: Noir',
        '',
        NULL,
        NULL,
        '/img/catalog/product/24',
        '/img/catalog/product/24/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        25,
        'KI009',
        'CARTE GRAPHIQUE MSI NVIDIA GEFORCE GT 730 2GD3H (912-V809-3861)',
        'CARTE GRAPHIQUE MSI NVIDIA GEFORCE GT 730 2GD3H (912-V809-3861)',
        9,
        35000.00,
        'Carte Graphique MSI Nvidia GeForce GT 730 - Taille de mémoire: 2 Go - Type de mémoire: GDDR3 - Bus Standard: PCI Express 2.0 - Résolution maximale: 4096 x 2160 pixels - Vitesse d\'horloge de la mémoire: 1600 MHz - Version DirectX: 12.0 - Version OpenGL: 4.4 - Nombre de moniteurs supportés: 3 - Hauteur du support: profil bas (LP) - Alimentation minimale du système: 300 W - Connecteurs: 1x HDMI, 1x DVI-D, 1 x VGA, PCI Express 2.0 - Dimensions: 150 x 69 x 38 mm - Garantie: 2 ans',
        'Carte Graphique MSI Nvidia GeForce GT 730 - Taille de mémoire: 2 Go - Type de mémoire: GDDR3 - Bus Standard: PCI Express 2.0 - Résolution maximale: 4096 x 2160 pixels - Vitesse d\'horloge de la mémoire: 1600 MHz - Version DirectX: 12.0 - Version OpenGL: 4.4 - Nombre de moniteurs supportés: 3 - Hauteur du support: profil bas (LP) - Alimentation minimale du système: 300 W - Connecteurs: 1x HDMI, 1x DVI-D, 1 x VGA, PCI Express 2.0 - Dimensions: 150 x 69 x 38 mm - Garantie: 2 ans',
        '',
        NULL,
        NULL,
        '/img/catalog/product/25',
        '/img/catalog/product/25/main.jpg',
        3,
        NULL,
        1,
        1,
        1
    ), (
        26,
        'CG567',
        'CARTE GRAPHIQUE GAMER PNY GEFORCE GT 1030 2GO (VCG10302D4SFPPB)',
        'CARTE GRAPHIQUE GAMER PNY GEFORCE GT 1030 2GO (VCG10302D4SFPPB)',
        8,
        38000.00,
        'Carte Graphique Gamer PNY GeForce GT 1030 - Taille mémoire: 2 Go - Type de mémoire: GDDR4 - Taille interface mémoire: 64 bits - Vitesse de l\'horloge: 1151 MHz - Vitesse de la mémoire: 2.1 Gbps - Type Carte Graphique: Nvidia GeForce GT 1030 - Résolution maximale: 4096 x 2160 - Support de bus: PCI-E 3.0 x 16 - Microsoft DirectX: 12 - Nombre d\'écrans: 2 - Connecteurs: HDMI 2.0b, DL-DVI - Dimensions: 13.7 x 6.9 x 2 cm - Garantie: 1 an',
        'Carte Graphique Gamer PNY GeForce GT 1030 - Taille mémoire: 2 Go - Type de mémoire: GDDR4 - Taille interface mémoire: 64 bits - Vitesse de l\'horloge: 1151 MHz - Vitesse de la mémoire: 2.1 Gbps - Type Carte Graphique: Nvidia GeForce GT 1030 - Résolution maximale: 4096 x 2160 - Support de bus: PCI-E 3.0 x 16 - Microsoft DirectX: 12 - Nombre d\'écrans: 2 - Connecteurs: HDMI 2.0b, DL-DVI - Dimensions: 13.7 x 6.9 x 2 cm - Garantie: 1 an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/26',
        '/img/catalog/product/26/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        27,
        'PC6868',
        'BOÎTIER PC GAMER MSI MAG VAMPIRIC 100R - NOIR',
        'BOÎTIER PC GAMER MSI MAG VAMPIRIC 100R - NOIR',
        0,
        54000.00,
        'Boîtier PC Gamer MSI Mag VAMPIRIC 100R - Format du boitier: Moyenne tour - Format de carte mère: Micro ATX , Mini ITX , ATX - Format Alimentation: ATX/EPS - Longeur de Carte graphique (max): 300 mm - Hauteur max. ventilateur CPU: 160 mm - Nombre d\'emplacements pour ventilateur(s) arrière: 1 x 120 mm - Nombre d\'emplacements pour ventilateur(s) en facade: 2 x 140 mm, 3 x 120 mm - Nombre d\'emplacements pour ventilateur(s) dessus: 2 x 120 mm - Compatibilité radiateur AIO: Radiateur 240mm, 140 mm, 120 mm - Nombre de slots PCI: 7 - Nombre d\'emplacements 3,5 pouces invisibles: 1 - Nombre d\'emplacements 2,5": 2 - Nombre d\'emplacements 2,5"/3,5": 1 - Verre trempé - LED RGB - LED ARGB - Compatible Watercooling - Connecteurs: 2 x USB 2.0 , Casque (Jack 3.5mm Femelle) , 1 x USB 3.0 , Micro (Jack 3.5mm Femelle) - Dimensions: 205 x 457 x 390 mm - Couleur: Noir - Garantie: 1 an',
        'Boîtier PC Gamer MSI Mag VAMPIRIC 100R - Format du boitier: Moyenne tour - Format de carte mère: Micro ATX , Mini ITX , ATX - Format Alimentation: ATX/EPS - Longeur de Carte graphique (max): 300 mm - Hauteur max. ventilateur CPU: 160 mm - Nombre d\'emplacements pour ventilateur(s) arrière: 1 x 120 mm - Nombre d\'emplacements pour ventilateur(s) en facade: 2 x 140 mm, 3 x 120 mm - Nombre d\'emplacements pour ventilateur(s) dessus: 2 x 120 mm - Compatibilité radiateur AIO: Radiateur 240mm, 140 mm, 120 mm - Nombre de slots PCI: 7 - Nombre d\'emplacements 3,5 pouces invisibles: 1 - Nombre d\'emplacements 2,5": 2 - Nombre d\'emplacements 2,5"/3,5": 1 - Verre trempé - LED RGB - LED ARGB - Compatible Watercooling - Connecteurs: 2 x USB 2.0 , Casque (Jack 3.5mm Femelle) , 1 x USB 3.0 , Micro (Jack 3.5mm Femelle) - Dimensions: 205 x 457 x 390 mm - Couleur: Noir - Garantie: 1 an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/27',
        '/img/catalog/product/27/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        28,
        'SG564',
        'SOURIS GAMER MANHATTAN 176071 NOIR',
        'SOURIS GAMER MANHATTAN 176071 NOIR',
        6,
        6500.00,
        'Souris Gamer MANHATTAN - Connectivité: Filaire - Interface: USB - Capteur optique - Résolutions 800/1200/1600/2400 dpi - Matériel: plastique ABS - Longueur de câble: 1,5 m - Couleur: Noir - Garantie: 3 ans \r\n\r\n',
        'Souris Gamer MANHATTAN - Connectivité: Filaire - Interface: USB - Capteur optique - Résolutions 800/1200/1600/2400 dpi - Matériel: plastique ABS - Longueur de câble: 1,5 m - Couleur: Noir - Garantie: 3 ans \r\n\r\n',
        '',
        NULL,
        NULL,
        '/img/catalog/product/28',
        '/img/catalog/product/28/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        29,
        'SR543',
        'SOURIS GAMER AULA INERTIA - NOIR (0021280)',
        'SOURIS GAMER AULA INERTIA - NOIR (0021280)',
        4,
        2300.00,
        'Souris USB Gamer AULA Inertia - Type de Capteur: Optique - Technologie de Connectivité: Filaire - Interface avec l\'ordinateur: USB - Nombre de boutons: 4 - Résolution optique: 2400 dpi - Capteur optique haute performance et quatre préréglages DPI pour la précision et la flexibilité - Design ergonomique pour augmenter le confort - Couleur: Noir',
        'Souris USB Gamer AULA Inertia - Type de Capteur: Optique - Technologie de Connectivité: Filaire - Interface avec l\'ordinateur: USB - Nombre de boutons: 4 - Résolution optique: 2400 dpi - Capteur optique haute performance et quatre préréglages DPI pour la précision et la flexibilité - Design ergonomique pour augmenter le confort - Couleur: Noir',
        '',
        NULL,
        NULL,
        '/img/catalog/product/29',
        '/img/catalog/product/29/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        30,
        'SR354',
        'SOURIS GAMER NITROX GT-100 LED RVB - NOIR',
        'SOURIS GAMER NITROX GT-100 LED RVB - NOIR',
        4,
        5400.00,
        'Souris Gamer NITROX - Éclairage LED RVB - Technologie de connectivité: Filaire - Résolution optique: 6400 dpi - Nombre de Boutons: 7 Boutons - 6 effets RVB sélectionnables - Touches avant et arrière - Câble gainé avec noyau en ferrite - Design ergonomique - Longueur de câble: 1.5 m - Systéme d\'exploitation requis: MAC, OS Windows 98/2000 / XP / 7/8/10, Linux - Dimensions: 41 x 81 x 124 mm - Couleur: Noir - Garantie: 1 an',
        'Souris Gamer NITROX - Éclairage LED RVB - Technologie de connectivité: Filaire - Résolution optique: 6400 dpi - Nombre de Boutons: 7 Boutons - 6 effets RVB sélectionnables - Touches avant et arrière - Câble gainé avec noyau en ferrite - Design ergonomique - Longueur de câble: 1.5 m - Systéme d\'exploitation requis: MAC, OS Windows 98/2000 / XP / 7/8/10, Linux - Dimensions: 41 x 81 x 124 mm - Couleur: Noir - Garantie: 1 an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/30',
        '/img/catalog/product/30/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        31,
        'CL876',
        'CLAVIER GAMING SEMI-MÉCANIQUE REDRAGON CENTAUR K506-1 - NOIR',
        'CLAVIER GAMING SEMI-MÉCANIQUE REDRAGON CENTAUR K506-1 - NOIR',
        8,
        2800.00,
        'Clavier Gaming Semi-Mécanique REDRAGON Centaur - Technologie de connectivité: Filaire - Interface: USB - Norme clavier: AZERTY - Rétro-éclairé: RGB 7 couleurs - Filtre USB et anti-interférence plaqués or - Matrice: 100% anti-fantômes avec basculement à 26 touches - Construction: Plastique ABS renforcé - Anti-éclaboussures - Clés moulées par injection à double injection - Dimensions: 44.5 × 16.5 × 3.7cm - Couleur: Noir - Garantie: 1 an',
        'Clavier Gaming Semi-Mécanique REDRAGON Centaur - Technologie de connectivité: Filaire - Interface: USB - Norme clavier: AZERTY - Rétro-éclairé: RGB 7 couleurs - Filtre USB et anti-interférence plaqués or - Matrice: 100% anti-fantômes avec basculement à 26 touches - Construction: Plastique ABS renforcé - Anti-éclaboussures - Clés moulées par injection à double injection - Dimensions: 44.5 × 16.5 × 3.7cm - Couleur: Noir - Garantie: 1 an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/31',
        '/img/catalog/product/31/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        32,
        'DF988',
        'BRACELET CONNECTÉ HUAWEI BAND 7 - ROSE',
        'BRACELET CONNECTÉ HUAWEI BAND 7 - ROSE',
        4,
        6000.00,
        'Écran AMOLED 1.47" (194 x 368 pixels) - Systéme d\'\'exploitation: Android 6.0 et plus et iOS 9.0 et plus - Connectivité: Bluetooth 5.0 - Capacité de la batterie: 180 mAh - Capteurs: accéléromètre, gyroscopique, Capteur de fréquence cardiaque optique - Autonomie de Batterie: jusqu\'à 14 Jours (utilisation typique) - Résistance à l\'eau: 5 ATM - Matière : polymères durables, Bracelet en silicone - Dimensions: 44,35 x 26 x 9,99 mm - Poids: env 16g - Couleur: Rose - Garantie: 1an\r\n\r\n',
        'Écran AMOLED 1.47" (194 x 368 pixels) - Systéme d\'\'exploitation: Android 6.0 et plus et iOS 9.0 et plus - Connectivité: Bluetooth 5.0 - Capacité de la batterie: 180 mAh - Capteurs: accéléromètre, gyroscopique, Capteur de fréquence cardiaque optique - Autonomie de Batterie: jusqu\'à 14 Jours (utilisation typique) - Résistance à l\'eau: 5 ATM - Matière : polymères durables, Bracelet en silicone - Dimensions: 44,35 x 26 x 9,99 mm - Poids: env 16g - Couleur: Rose - Garantie: 1an\r\n\r\n',
        '',
        NULL,
        NULL,
        '/img/catalog/product/32',
        '/img/catalog/product/32/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        33,
        '5AR83B',
        'IMPRIMANTE HP DESKJET MULTIFONCTION 2710 WI-FI TOUT EN UN (5AR83B)',
        'IMPRIMANTE HP DESKJET MULTIFONCTION 2710 WI-FI TOUT EN UN (5AR83B)',
        8,
        45000.00,
        'Imprimante HP Deskjet Multifonction 2710 Tout En Un - Fonctions: Impression, Copie, Numerisation - Technologie d\'impression: Jet d\'encre thermique - Format: A4 -Vitesse d’impression (Noir / Couleur): Jusqu\'à 20ppm / jusqu\'à 16ppm - Résolution de l’impression (Noir/Couleur): 1200 x 1200 ppp / 4800 x 1200 ppp - Résolution de numérisation: Jusqu\'à 1200ppp - Résolution de copie : Jusqu\'à 300 x 300 ppp - Bac d\'alimentation: 60 feuilles - Fonctionnalité d\'impression mobile - Connectivité: Wi-Fi, USB 2.0 - Dimensions: 425 x 546 x 250 mm - Poids: 3.42kg - Couleur: Blanc - Garantie 1 an',
        'Imprimante HP Deskjet Multifonction 2710 Tout En Un - Fonctions: Impression, Copie, Numerisation - Technologie d\'impression: Jet d\'encre thermique - Format: A4 -Vitesse d’impression (Noir / Couleur): Jusqu\'à 20ppm / jusqu\'à 16ppm - Résolution de l’impression (Noir/Couleur): 1200 x 1200 ppp / 4800 x 1200 ppp - Résolution de numérisation: Jusqu\'à 1200ppp - Résolution de copie : Jusqu\'à 300 x 300 ppp - Bac d\'alimentation: 60 feuilles - Fonctionnalité d\'impression mobile - Connectivité: Wi-Fi, USB 2.0 - Dimensions: 425 x 546 x 250 mm - Poids: 3.42kg - Couleur: Blanc - Garantie 1 an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/33',
        '/img/catalog/product/33/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        34,
        'TS349',
        'IMPRIMANTE JET D\'ENCRE CANON PIXMA TS-3140 COULEUR WIFI',
        'IMPRIMANTE JET D\'ENCRE CANON PIXMA TS-3140 COULEUR WIFI',
        4,
        56000.00,
        'Imprimante Jet D\'encre CANON PIXMA TS-3140 - Ecran LCD de 3,8 cm - Fonctions: Impression, Copie, Scan - Technologie d\'impression: Jet d\'encre Couleur - Vitesse d\'impression: 7.7 ipm (Noir), 4 ipm (couleur) - Résolution d\'impression: Jusqu\'à 4800 x 1200 ppp - Vitesse de numérisation: Environ 15 s  - Résolution du scanner: 600 x 1200 ppp - Capacité d\'entrée Papier: 60 feuilles (papier Ordinaire) - Format Papier: A4 - Interface: USB, Wi-Fi - Dimensions: 435 x 316 x 145 mm - Poids: 3,9 kg - Couleur: Noir - Garantie: 1 an\r\n\r\nLivraison Gratuite à partir de 300DT d\'Achat* Livraison Gratuite Pour 1 seul colis ? 30 Kg\r\n',
        'Imprimante Jet D\'encre CANON PIXMA TS-3140 - Ecran LCD de 3,8 cm - Fonctions: Impression, Copie, Scan - Technologie d\'impression: Jet d\'encre Couleur - Vitesse d\'impression: 7.7 ipm (Noir), 4 ipm (couleur) - Résolution d\'impression: Jusqu\'à 4800 x 1200 ppp - Vitesse de numérisation: Environ 15 s  - Résolution du scanner: 600 x 1200 ppp - Capacité d\'entrée Papier: 60 feuilles (papier Ordinaire) - Format Papier: A4 - Interface: USB, Wi-Fi - Dimensions: 435 x 316 x 145 mm - Poids: 3,9 kg - Couleur: Noir - Garantie: 1 an\r\n\r\nLivraison Gratuite à partir de 300DT d\'Achat* Livraison Gratuite Pour 1 seul colis ? 30 Kg\r\n',
        '',
        NULL,
        NULL,
        '/img/catalog/product/34',
        '/img/catalog/product/34/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        35,
        'DF7678',
        'IMPRIMANTE JET D\'ENCRE CANON PIXMA TR-4640 MULTIFONCTION 4EN1 WIFI COULEUR - NOIR',
        'IMPRIMANTE JET D\'ENCRE CANON PIXMA TR-4640 MULTIFONCTION 4EN1 WIFI COULEUR - NOIR',
        4,
        60000.00,
        'Imprimante Jet D\'encre CANON Pixma TR-4640 - Fonction: Impression, copie, scan, Fax - Technologie d\'impression: Jet D\'encre - Ecran LCD plein point (monochrome) - Vitesse d\'impression en N&B/couleur: env 8,8 ipm / env. 4,4 ipm - Résolution d\'impression: 4800 x 1200 ppp - Vitesse d\'impression d\'une photo sans marge 4" x 6" (10x15cm) : env. 65 secondes - Impression sans bordure - Résolution optique du scanner: 600 x 1200 ppp - Alimentation papiers: 100 feuilles - Grammage papier: 64 g/m² - 105 g/m² ou papiers - Interface: USB (port B), Wi-Fi - Dimensions: env. 435 x 295 x 189 mm - Poids: environ 5,8 kg - Couleur: Noir - Garantie: 1 an',
        'Imprimante Jet D\'encre CANON Pixma TR-4640 - Fonction: Impression, copie, scan, Fax - Technologie d\'impression: Jet D\'encre - Ecran LCD plein point (monochrome) - Vitesse d\'impression en N&B/couleur: env 8,8 ipm / env. 4,4 ipm - Résolution d\'impression: 4800 x 1200 ppp - Vitesse d\'impression d\'une photo sans marge 4" x 6" (10x15cm) : env. 65 secondes - Impression sans bordure - Résolution optique du scanner: 600 x 1200 ppp - Alimentation papiers: 100 feuilles - Grammage papier: 64 g/m² - 105 g/m² ou papiers - Interface: USB (port B), Wi-Fi - Dimensions: env. 435 x 295 x 189 mm - Poids: environ 5,8 kg - Couleur: Noir - Garantie: 1 an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/35',
        '/img/catalog/product/35/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        36,
        'JDT778',
        'IMPRIMANTE JET D\'ENCRE CANON PIXMA G-2411 MULTIFONCTION 3EN1 COULEUR - NOIR',
        'IMPRIMANTE JET D\'ENCRE CANON PIXMA G-2411 MULTIFONCTION 3EN1 COULEUR - NOIR',
        6,
        67000.00,
        'Imprimante Jet D\'encre CANON PIXMA G-2411- Imprimante à réservoir intégré - Type et taille d\'affichage: Écran LCD (mono segment 1,2 pouces)  - Fonctions: Impression, copie et numérisation - Format: A4, A5, B5, 10 × 15 cm, 13 × 18 cm, 20 × 25 cm, Enveloppes (DL, COM10), Lettre, Légal - Technologie d\'impression: Jet d\'encre Couleur - Vitesse d\'impression (N&B / Couleur): Environ 8,8 ipm / environ 5 ipm - Résolution d\'impression: 4800x1200dpi - Résolution du scanner: 600 x 1200 ppp - Capacité papier maximum en entrée: max. 100 feuilles (papier ordinaire) - Grammage: papier ordinaire: de 64 à 105 g/m² / Papier photo Canon: jusqu\'à 275g/m² - Autonomie: Noir: 12000p (2 bouteilles) / Couleur: 7000p - Connectivité: USB Haute-vitesse (Port-B) - Poids: 6,3 kg - Dimensions(L×P× H): 445 x 330 x 163 mm - Garantie: 1 an',
        'Imprimante Jet D\'encre CANON PIXMA G-2411- Imprimante à réservoir intégré - Type et taille d\'affichage: Écran LCD (mono segment 1,2 pouces)  - Fonctions: Impression, copie et numérisation - Format: A4, A5, B5, 10 × 15 cm, 13 × 18 cm, 20 × 25 cm, Enveloppes (DL, COM10), Lettre, Légal - Technologie d\'impression: Jet d\'encre Couleur - Vitesse d\'impression (N&B / Couleur): Environ 8,8 ipm / environ 5 ipm - Résolution d\'impression: 4800x1200dpi - Résolution du scanner: 600 x 1200 ppp - Capacité papier maximum en entrée: max. 100 feuilles (papier ordinaire) - Grammage: papier ordinaire: de 64 à 105 g/m² / Papier photo Canon: jusqu\'à 275g/m² - Autonomie: Noir: 12000p (2 bouteilles) / Couleur: 7000p - Connectivité: USB Haute-vitesse (Port-B) - Poids: 6,3 kg - Dimensions(L×P× H): 445 x 330 x 163 mm - Garantie: 1 an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/36',
        '/img/catalog/product/36/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        37,
        'VP228',
        'ECRAN ASUS VP228HE 21.5" FULL HD 60HZ',
        'ECRAN ASUS VP228HE 21.5" FULL HD 60HZ',
        3,
        43000.00,
        'Écran ASUS VP228HE- Taille de l\'écran: 21.5" FULL HD , 60 Hz - Résolution: 1920 x 1080 pixel - Format d\'écran: 16:9 - Rapport de contraste: 100000000:1 - Luminosité: 200 cd/m² - Temps de réponse: 1 ms - Type de dalle: TN - Angle de vue (H / V): 90°/60° - Connecteurs:1xHDMI 1.4, 1X VGA - Inclinaison: +20° ~ -5°  - Dimensions: 513 x 199,4 x 373 mm - Poids: 3,5 kg - Couleur: Noir- Garantie: 1 an',
        'Écran ASUS VP228HE- Taille de l\'écran: 21.5" FULL HD , 60 Hz - Résolution: 1920 x 1080 pixel - Format d\'écran: 16:9 - Rapport de contraste: 100000000:1 - Luminosité: 200 cd/m² - Temps de réponse: 1 ms - Type de dalle: TN - Angle de vue (H / V): 90°/60° - Connecteurs:1xHDMI 1.4, 1X VGA - Inclinaison: +20° ~ -5°  - Dimensions: 513 x 199,4 x 373 mm - Poids: 3,5 kg - Couleur: Noir- Garantie: 1 an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/37',
        '/img/catalog/product/37/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        38,
        'CS900',
        'DISQUE DUR INTERNE PNY CS900 120GO SSD 2.5" (SSD7CS900-120-PB)',
        'DISQUE DUR INTERNE PNY CS900 120GO SSD 2.5" (SSD7CS900-120-PB)',
        5,
        25000.00,
        'Disque Dur Interne PNY CS900 6 Capacité de stockage: 120 Go - Interface: SATA III 6Gb - Format de Disque: 2.5" - Vitesse en lecture: 515 Mo/s - Vitesse en écriture: 490 Mo/s - Consommation d\'énergie: 2,2 W actif, 0,17 W au ralenti - Les SSD PNY sont jusqu\'à 30 fois plus robustes que les disques durs traditionnels -  Les mémoires NAND non volatiles du système permettent au SSD de conserver les informations enregistrées même si votre ordinateur chute - Garantie: 1 an',
        'Disque Dur Interne PNY CS900 6 Capacité de stockage: 120 Go - Interface: SATA III 6Gb - Format de Disque: 2.5" - Vitesse en lecture: 515 Mo/s - Vitesse en écriture: 490 Mo/s - Consommation d\'énergie: 2,2 W actif, 0,17 W au ralenti - Les SSD PNY sont jusqu\'à 30 fois plus robustes que les disques durs traditionnels -  Les mémoires NAND non volatiles du système permettent au SSD de conserver les informations enregistrées même si votre ordinateur chute - Garantie: 1 an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/38',
        '/img/catalog/product/38/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        39,
        '2710DC',
        'DISQUE DUR INTERNE KING FAST 128GO SSD 2.5" (2710DCS23BF-128)',
        'DISQUE DUR INTERNE KING FAST 128GO SSD 2.5" (2710DCS23BF-128)',
        3,
        16000.00,
        'Disque Dur Interne KING FAST - Capacité de stockage: 128 Go - Type de Disque Dur: SSD - Interface: SATA III - Format de Disque: 2.5" - Vitesse en lecture: 558 Mo/s - Vitesse en écriture: 460 Mo/s - Puces mémoire: 3D TLC NAND flash - Temps de réponse: 0,2 ms - MTBF: 2.000. 000 heures - Garantie: 1 an\r\n\r\n',
        'Disque Dur Interne KING FAST - Capacité de stockage: 128 Go - Type de Disque Dur: SSD - Interface: SATA III - Format de Disque: 2.5" - Vitesse en lecture: 558 Mo/s - Vitesse en écriture: 460 Mo/s - Puces mémoire: 3D TLC NAND flash - Temps de réponse: 0,2 ms - MTBF: 2.000. 000 heures - Garantie: 1 an\r\n\r\n',
        '',
        NULL,
        NULL,
        '/img/catalog/product/39',
        '/img/catalog/product/39/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        40,
        'AS340',
        'DISQUE DUR INTERNE APACER AS340 120GO SSD 2.5"',
        'DISQUE DUR INTERNE APACER AS340 120GO SSD 2.5"',
        4,
        13000.00,
        'Disque Dur Interne APACER AS340 - Capacité de stockage: 120Go - Type de Disque Dur: SSD - Interface: SATA III 6.0 Gb / s - Format de Disque: 2.5" - Vitesse en lecture: 490 Mo/s - Vitesse en écriture: 360 Mo/s - Dimensions: 69,9 x 100 x 7 mm - Poids: 75 gr - Garantie: 1 an',
        'Disque Dur Interne APACER AS340 - Capacité de stockage: 120Go - Type de Disque Dur: SSD - Interface: SATA III 6.0 Gb / s - Format de Disque: 2.5" - Vitesse en lecture: 490 Mo/s - Vitesse en écriture: 360 Mo/s - Dimensions: 69,9 x 100 x 7 mm - Poids: 75 gr - Garantie: 1 an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/40',
        '/img/catalog/product/40/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        41,
        'MP241X ',
        'ECRAN MSI PRO MP241X 23.8" FULL HD 75 HZ',
        'ECRAN MSI PRO MP241X 23.8" FULL HD 75 HZ',
        4,
        24500.00,
        'Ecran MSI Pro - Taille de l\'ecran: 23.8" FULL HD, 75 Hz - Résolution: 1920 x 1080 pixels - Format: 16:9 - Luminosité: 250 cd/m² - Contraste: 3000:1 - Temps de réponse: 8 ms - Angle de vision: 178°(H) / 178°(V) - Inclinaison: -5 ° à 15 ° - Connecteurs: 1x HDMI (1.4b), 1x D-Sub (VGA) - Couleur: Noir - Garantie: 2 ans',
        'Ecran MSI Pro - Taille de l\'ecran: 23.8" FULL HD, 75 Hz - Résolution: 1920 x 1080 pixels - Format: 16:9 - Luminosité: 250 cd/m² - Contraste: 3000:1 - Temps de réponse: 8 ms - Angle de vision: 178°(H) / 178°(V) - Inclinaison: -5 ° à 15 ° - Connecteurs: 1x HDMI (1.4b), 1x D-Sub (VGA) - Couleur: Noir - Garantie: 2 ans',
        '',
        NULL,
        NULL,
        '/img/catalog/product/41',
        '/img/catalog/product/41/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        42,
        'MK430H',
        'ECRAN LG 23.8" FULL HD 24MK430H-B 75HZ',
        'ECRAN LG 23.8" FULL HD 24MK430H-B 75HZ',
        6,
        46000.00,
        'Écran LG - Taille de l\'écran: 23.8" FULL HD IPS, 75 Hz - Résolution: 1920 x 1080 pixel - Format d\'écran: 16:9 - Rapport de contraste: 1000: 1 - Luminosité: 250 cd/m² - Temps de réponse: 5 ms - Type de dalle: IPS - Angle de vue (H / V): 178°/178° - Connecteurs: 1x HDMI, 1x VGA - Inclinaison: +20° ~ -5° - Technologie AMD FreeSync - Dimensions: 555 x 421 x 181.9 mm - Poids: 3.1 Kg - Couleur: Noir - Garantie: 1 an',
        'Écran LG - Taille de l\'écran: 23.8" FULL HD IPS, 75 Hz - Résolution: 1920 x 1080 pixel - Format d\'écran: 16:9 - Rapport de contraste: 1000: 1 - Luminosité: 250 cd/m² - Temps de réponse: 5 ms - Type de dalle: IPS - Angle de vue (H / V): 178°/178° - Connecteurs: 1x HDMI, 1x VGA - Inclinaison: +20° ~ -5° - Technologie AMD FreeSync - Dimensions: 555 x 421 x 181.9 mm - Poids: 3.1 Kg - Couleur: Noir - Garantie: 1 an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/42',
        '/img/catalog/product/42/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        43,
        'PC0089',
        'PC DE BUREAU LENOVO V50S-07IMB I3 10È GÉN 8GO 1TO - NOIR',
        'PC DE BUREAU LENOVO V50S-07IMB I3 10È GÉN 8GO 1TO - NOIR',
        4,
        114000.00,
        'Processeur: Intel Pentium Gold G6400 (4,00 GHz, 4Mo de Mémoire Cache, Dual-Core) - Système d\'exploitation: FreeDos - Mémoire RAM: 4 Go DDR4 - Disque Dur: 1 To HDD - Carte Graphique: Intel® UHD Graphics, avec 4x USB 3.2 Gen 1, 4x USB 2.0, 1xRJ-45, 1x VGA, 1x sortie HDMI 1.4, 1x DisplayPort 1.4, 1x prise combo casque/micro (3,5 mm), 1x micro (3,5 mm), 1x série (9 broches), 1x sortie de ligne (3,5 mm) - Couleur: Noir - Garantie: 1 an',
        'Processeur: Intel Pentium Gold G6400 (4,00 GHz, 4Mo de Mémoire Cache, Dual-Core) - Système d\'exploitation: FreeDos - Mémoire RAM: 4 Go DDR4 - Disque Dur: 1 To HDD - Carte Graphique: Intel® UHD Graphics, avec 4x USB 3.2 Gen 1, 4x USB 2.0, 1xRJ-45, 1x VGA, 1x sortie HDMI 1.4, 1x DisplayPort 1.4, 1x prise combo casque/micro (3,5 mm), 1x micro (3,5 mm), 1x série (9 broches), 1x sortie de ligne (3,5 mm) - Couleur: Noir - Garantie: 1 an',
        'Processeur: Intel Pentium Gold G6400 (4,00 GHz, 4Mo de Mémoire Cache, Dual-Core) - Système d\'exploitation: FreeDos - Mémoire RAM: 4 Go DDR4 - Disque Dur: 1 To HDD - Carte Graphique: Intel® UHD Graphics, avec 4x USB 3.2 Gen 1, 4x USB 2.0, 1xRJ-45, 1x VGA, 1x sortie HDMI 1.4, 1x DisplayPort 1.4, 1x prise combo casque/micro (3,5 mm), 1x micro (3,5 mm), 1x série (9 broches), 1x sortie de ligne (3,5 mm) - Couleur: Noir - Garantie: 1 an',
        NULL,
        NULL,
        '/img/catalog/product/43',
        '/img/catalog/product/43/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        44,
        'CA456',
        'CABLE MAGNÉTIQUE MICRO USB (TN-CB-MUSB)',
        'CABLE MAGNÉTIQUE MICRO USB (TN-CB-MUSB)',
        4,
        2000.00,
        'Cable Magnétique Micro USB - Interface: USB 2.0 -haute qualité dans la transmission et le chargement des données - Facile à utiliser - Couleur: Noir ',
        'Cable Magnétique Micro USB - Interface: USB 2.0 -haute qualité dans la transmission et le chargement des données - Facile à utiliser - Couleur: Noir ',
        '',
        NULL,
        NULL,
        '/img/catalog/product/44',
        '/img/catalog/product/44/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        45,
        'KV391',
        'HAUT-PARLEUR KISONLI V310 FILAIRE BLEU',
        'HAUT-PARLEUR KISONLI V310 FILAIRE BLEU',
        5,
        2500.00,
        'Haut-parleur KISONLI - Connectivité: Filaire - Impédance: 4 ohms - Puissance de sortie: 2 x 1.5 W - Alimentation: USB - Interface: prise jack 3,5 mm - Compatible avec: Ordinateur, iPhone, iPod, ordinateur portable, Téléphone portable, MP3, MP4, MP5, Tablet PC - Longueur de câble: 90cm - Couleur: Bleu',
        'Haut-parleur KISONLI - Connectivité: Filaire - Impédance: 4 ohms - Puissance de sortie: 2 x 1.5 W - Alimentation: USB - Interface: prise jack 3,5 mm - Compatible avec: Ordinateur, iPhone, iPod, ordinateur portable, Téléphone portable, MP3, MP4, MP5, Tablet PC - Longueur de câble: 90cm - Couleur: Bleu',
        '',
        NULL,
        NULL,
        '/img/catalog/product/45',
        '/img/catalog/product/45/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        46,
        'HG900',
        'HAUT-PARLEUR FILAIRE HAMA 173123 - NOIR',
        'HAUT-PARLEUR FILAIRE HAMA 173123 - NOIR',
        3,
        3000.00,
        'Haut-Parleur HAMA - Technologie de Connectivité: Filaire - Puissance: 5 Watts - Connecteurs: Jack Audio 3.5 mm, USB pour charge,  Batterie Rechargeable: Li-Polymer 750 mAh - Autonomie: Jusqu\'à 4-6h - Tension: 5V-500 mA - Longue durée de vie de la batterie - Simple et facile à utiliser - Connectivité: USB, Jack 3.5mm - Dimensions: 70 x 63 x 73 mm - Poids: 171 gr - Couleur: Noir - Garantie: 1 an',
        'Haut-Parleur HAMA - Technologie de Connectivité: Filaire - Puissance: 5 Watts - Connecteurs: Jack Audio 3.5 mm, USB pour charge,  Batterie Rechargeable: Li-Polymer 750 mAh - Autonomie: Jusqu\'à 4-6h - Tension: 5V-500 mA - Longue durée de vie de la batterie - Simple et facile à utiliser - Connectivité: USB, Jack 3.5mm - Dimensions: 70 x 63 x 73 mm - Poids: 171 gr - Couleur: Noir - Garantie: 1 an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/46',
        '/img/catalog/product/46/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        47,
        'PV50S',
        'PC DE BUREAU LENOVO V50S-07IMB I3 10È GÉN 16GO 1TO - NOIR',
        'PC DE BUREAU LENOVO V50S-07IMB I3 10È GÉN 16GO 1TO - NOIR',
        0,
        159000.00,
        'Processeur: Intel Core i3-10100 (3,60 GHz up to 4,30 GHz Turbo max, 6Mo de Mémoire Cache, Quad-Core) - Système d\'exploitation: FreeDos - Mémoire RAM: 16 Go DDR4-2666 - Disque Dur: 1 To HDD - Carte Graphique: Intel® UHD Graphics, avec  Wi-Fi, Bluetooth,6x USB 3.2 Gen 1, 2 ports USB 2.0, 1x sortie HDMI 1.4, 1xRJ-45, 1x prise combinée casque/microphone (3,5 mm), 1x microphone (3,5 mm),1x série (9 broches), 1x sortie ligne (3,5 mm) - Couleur: Noir - Garantie: 1 an',
        'Processeur: Intel Core i3-10100 (3,60 GHz up to 4,30 GHz Turbo max, 6Mo de Mémoire Cache, Quad-Core) - Système d\'exploitation: FreeDos - Mémoire RAM: 16 Go DDR4-2666 - Disque Dur: 1 To HDD - Carte Graphique: Intel® UHD Graphics, avec  Wi-Fi, Bluetooth,6x USB 3.2 Gen 1, 2 ports USB 2.0, 1x sortie HDMI 1.4, 1xRJ-45, 1x prise combinée casque/microphone (3,5 mm), 1x microphone (3,5 mm),1x série (9 broches), 1x sortie ligne (3,5 mm) - Couleur: Noir - Garantie: 1 an',
        '',
        NULL,
        NULL,
        '/img/catalog/product/47',
        '/img/catalog/product/47/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        48,
        'MC588',
        'MICRO CASQUE 588 - NOIR & BLEU',
        'MICRO CASQUE 588 - NOIR & BLEU',
        3,
        3400.00,
        'Micro Casque - Technologie de Connectivité: Filaire - Interface: Jack 3.5 mm - Impédance: 32 Ohm - Fréquence: 20Hz-20KHz - Sensibilité: 98 dB - Longueur du câble: 1.5 m - Couleur: Noir',
        'Micro Casque - Technologie de Connectivité: Filaire - Interface: Jack 3.5 mm - Impédance: 32 Ohm - Fréquence: 20Hz-20KHz - Sensibilité: 98 dB - Longueur du câble: 1.5 m - Couleur: Noir',
        '',
        NULL,
        NULL,
        '/img/catalog/product/48',
        '/img/catalog/product/48/main.jpg',
        3,
        NULL,
        2,
        2,
        1
    ), (
        49,
        'Xiaomi Redmi Note 10 5G',
        'Xiaomi Redmi Note 10 5G',
        'Redmi note 10 5G',
        5,
        51000.00,
        'Le Xiaomi Redmi Note 10 5G est un smartphone 4G et 5G de la famille « Redmi Note 10 » annoncé en mars 2021. Seul smartphone de la gamme compatible 5G grâce à son SoC MediaTek Dimensity 700, il dispose également d\'un écran compatible 90 Hz et d\'un capteur photo de 48 mégapixels.',
        'Redmi note 10 5G\r\nMémoire : 128GB\r\nRAM : 4GB\r\nCaméra : 48 +2+2 mpx\r\nSelfie : 8 mpx\r\nProcesseur Dimensity 700 (7 nm)\r\nBatterie : 5000 mAh\r\nFast Charge 18 Watt\r\nÉcran IPS LCD 90 Hz \r\nRéseau 5G Bands ',
        '',
        NULL,
        NULL,
        '/img/catalog/product/49',
        '/img/catalog/product/49/main.jpg',
        3,
        NULL,
        1,
        2,
        1
    ), (
        50,
        'Xiaomi Redmi note 10 Pro',
        'Xiaomi Redmi note 10 Pro',
        'Redmi note 10 Pro',
        5,
        47500.00,
        'Le Xiaomi Redmi Note 10 5G est un smartphone 4G et 5G de la famille « Redmi Note 10 » annoncé en mars 2021. Seul smartphone de la gamme compatible 5G grâce à son SoC MediaTek Dimensity 700, il dispose également d\'un écran compatible 90 Hz et d\'un capteur photo de 48 mégapixels.',
        'Redmi note 10 Pro\r\nMémoire : 128 GB\r\nRAM : 6GB / 8GB\r\nCaméra : 108 mpx +8+5+2 mpx\r\nSelfie : 16 mpx\r\nProcesseur Snapdragon 732G\r\nBatterie : 5020 mAh\r\nFast Charge 33 Watt\r\nÉcran Super Amoled 120 Hz\r\nProtection Gorilla Glass 5',
        '',
        NULL,
        NULL,
        '/img/catalog/product/50',
        '/img/catalog/product/50/main.jpg',
        2,
        NULL,
        1,
        2,
        1
    );

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

-- Listage des données de la table ecom_literiedamour.product_details : ~20 rows (environ)

DELETE FROM `product_details`;

INSERT INTO
    `product_details` (
        `detail_id`,
        `product_id`,
        `detail_desig`
    )
VALUES (1, 49, 'XIAOMI'), (1, 50, 'XIAOMI'), (2, 49, 'Super AMOLED'), (2, 50, 'LCD'), (3, 49, '6.7 pouces'), (3, 50, '7 pouces'), (6, 49, '500 Gramme'), (6, 50, '600 Gramme'), (8, 49, '16 millions'), (8, 50, '16 millions'), (12, 49, '8 GB'), (12, 50, '16 GB'), (13, 49, '256 GB'), (13, 50, '128 GB'), (15, 49, '64 Mégapixel'), (15, 50, '64 Mégapixel'), (16, 49, '32 Mégapixel'), (16, 50, '32 Mégapixel'), (17, 49, '5000 mAh'), (17, 50, '5000 mAh');

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
    ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.sub_category : ~2 rows (environ)

DELETE FROM `sub_category`;

INSERT INTO
    `sub_category` (
        `sub_cat_id`,
        `sub_cat_name`,
        `sub_cat_pic`,
        `cat_id`
    )
VALUES (1, 'Téléphone', NULL, 1), (2, 'Accessoires', NULL, 1);

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