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