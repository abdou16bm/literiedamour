use ecom_literiedamour;
ALTER TABLE `status`
ADD COLUMN stat_color VARCHAR(200);

UPDATE `status`
SET stat_color = 'warning' WHERE stat_id = 1;
UPDATE `status`
SET stat_color = 'danger' WHERE stat_id = 2;
UPDATE `status`
SET stat_color = 'info' WHERE stat_id = 3;
UPDATE `status`
SET stat_color = 'success' WHERE stat_id = 4;

INSERT INTO `status` (`stat_id`, `stat_name`, `stat_color`) VALUES
(5, 'Retour', 'secondary');


/* ------------------------------------add delivery type ------------------------------------*/



-- Listage de la structure de la table ecom_literiedamour. delivery_type
CREATE TABLE IF NOT EXISTS `delivery_type` (
  `delivery_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `delivery_type_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`delivery_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Listage des données de la table ecom_literiedamour.delivery_type : ~2 rows (environ)
DELETE FROM `delivery_type`;
INSERT INTO `delivery_type` (`delivery_type_id`, `delivery_type_name`) VALUES
	(1, 'A domicile'),
	(2, 'Point de relais');
	
	
ALTER TABLE customer_order
ADD COLUMN delivery_type_id INT;
ALTER TABLE customer_order
ADD FOREIGN KEY (delivery_type_id) REFERENCES delivery_type(delivery_type_id);
UPDATE customer_order
SET delivery_type_id = 1;


ALTER TABLE delivery_price 
DROP FOREIGN KEY delivery_price_shop0_FK;
ALTER TABLE delivery_price 
DROP FOREIGN KEY delivery_price_wilaya_FK;
ALTER TABLE delivery_price
DROP PRIMARY KEY;

ALTER TABLE delivery_price
ADD COLUMN delivery_type_id INT;

ALTER TABLE delivery_price
ADD FOREIGN KEY (wilaya_id) REFERENCES wilaya(wilaya_id);
ALTER TABLE delivery_price
ADD FOREIGN KEY (shop_id) REFERENCES shop(shop_id);
ALTER TABLE delivery_price
ADD FOREIGN KEY (delivery_type_id) REFERENCES delivery_type(delivery_type_id);

ALTER TABLE delivery_price
ADD PRIMARY KEY (wilaya_id,shop_id,delivery_type_id);

UPDATE delivery_price
SET delivery_type_id = 1

/* ------------------------------------add delivery type ------------------------------------*/




/* ---------------------------- NEW UPDATE 13/03/2024 -------------------------*/

ALTER TABLE product DROP FOREIGN KEY FK_product_sub_category;
ALTER TABLE product DROP COLUMN sub_cat_id;

ALTER TABLE product ADD COLUMN cat_id INT;
ALTER TABLE product ADD FOREIGN KEY (cat_id) REFERENCES category(cat_id);

CREATE TABLE product_sub_cat (

product_id INT,
sub_cat_id INT,
FOREIGN KEY (product_id) REFERENCES product(product_id),
FOREIGN KEY (sub_cat_id) REFERENCES sub_category(sub_cat_id),
PRIMARY KEY (product_id,sub_cat_id)


)

/* ------------------------------NEW UPDATE 13/03/2024 ------------------------*/




