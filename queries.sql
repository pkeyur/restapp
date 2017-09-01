CREATE TABLE `restapp`.`users` ( `user_id` INT NOT NULL AUTO_INCREMENT , `user_name` VARCHAR(150) NOT NULL , `user_address` VARCHAR(300) NOT NULL , `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`user_id`)) ENGINE = InnoDB;

CREATE TABLE `restapp`.`groups` ( `group_id` INT NOT NULL AUTO_INCREMENT , `group_name` VARCHAR(150) NOT NULL , `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , PRIMARY KEY (`group_id`)) ENGINE = InnoDB;

CREATE TABLE associated_users (user_id integer, group_id integer,
   PRIMARY KEY (user_id, group_id),
   FOREIGN KEY (user_id)
      REFERENCES users(user_id)
      ON UPDATE CASCADE ON DELETE RESTRICT,
   FOREIGN KEY (group_id)
      REFERENCES groups(group_id)
      ON UPDATE CASCADE ON DELETE RESTRICT
   );