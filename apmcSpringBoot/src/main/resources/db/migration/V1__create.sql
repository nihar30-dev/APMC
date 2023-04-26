
CREATE TABLE `users` (
                         user_id INT NOT NULL AUTO_INCREMENT,
                         username VARCHAR(45) NOT NULL,
                         password VARCHAR(64) NOT NULL,
                         contact VARCHAR(10) NOT NULL ,
                         PRIMARY KEY (`user_id`)

);

CREATE TABLE roles (
                       role_id  INT NOT NULL AUTO_INCREMENT,
                       name VARCHAR(45) NOT NULL,
                       PRIMARY KEY (`role_id`)
);

CREATE TABLE users_roles (
                             user_id INT NOT NULL,
                             role_id INT NOT NULL,
                             KEY `user_fk_idx` (`user_id`),
                             KEY `role_fk_idx` (`role_id`),
                             CONSTRAINT `role_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
                             CONSTRAINT `user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

CREATE TABLE shops (
                       shop_id INT PRIMARY KEY AUTO_INCREMENT,
                       shop_no VARCHAR(5) NOT NULL UNIQUE
);

CREATE TABLE agent (agent_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
                    shop_id INT NOT NULL ,
                    company_name VARCHAR(60) NOT NULL UNIQUE ,
                    agent_name VARCHAR(10),
                    contact VARCHAR(10) NOT NULL,
                    user_id INT NOT NULL,
                    FOREIGN KEY(user_id) REFERENCES users(user_id),
                    FOREIGN KEY(shop_id) REFERENCES shops(shop_id)
);

CREATE TABLE item_type (item_type_id INT PRIMARY KEY AUTO_INCREMENT ,
                        item_type_name VARCHAR(20) NOT NULL );

CREATE TABLE items (item_id INT PRIMARY KEY AUTO_INCREMENT ,
                    item_name VARCHAR(20),
                    item_type_id INT ,
                    FOREIGN KEY (item_type_id) REFERENCES item_type(item_type_id));


CREATE TABLE daily_rates (rate_id INT PRIMARY KEY AUTO_INCREMENT,
                          item_id INT NOT NULL ,
                          min_price INT NOT NULL ,
                          max_price INT NOT NULL ,
                          avg_price INT NOT NULL ,
                          quantity INT NOT NULL ,
                          day DATE,
                          FOREIGN KEY (item_id) REFERENCES items(item_id)
);

CREATE TABLE slots (slot_id INT NOT NULL UNIQUE ,
                    item_id INT NOT NULL ,
                    quantity INT ,
                    slot_date DATE,
                    CONSTRAINT pk_slots PRIMARY KEY (item_id,slot_date),
                    FOREIGN KEY (item_id) REFERENCES items(item_id));

CREATE TABLE slot_details (slot_detail_id INT  PRIMARY KEY AUTO_INCREMENT ,
                           user_id INT NOT NULL ,
                           agent_id INT NOT NULL ,
                           item_id INT NOT NULL ,
                           quantity INT NOT NULL ,
                           slot_date DATE NOT NULL,
                           FOREIGN KEY (user_id) REFERENCES users(user_id),
                           FOREIGN KEY (agent_id) REFERENCES agent(agent_id),
                           FOREIGN KEY (item_id) REFERENCES items(item_id)

);

CREATE TABLE notification (notification_id INT PRIMARY KEY AUTO_INCREMENT ,
                           slot_id INT ,
                           notification_heading VARCHAR(128),
                           notification_detail VARCHAR(1024) ,
                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                           FOREIGN KEY (slot_id) REFERENCES slots(slot_id));

CREATE TABLE user_details (
                              user_detail_id INT PRIMARY KEY AUTO_INCREMENT,
                              user_id INT NOT NULL ,
                              full_name VARCHAR(60) NOT NULL ,
                              district VARCHAR(60) NOT NULL ,
                              taluka VARCHAR(60) NOT NULL ,
                              village VARCHAR(60) NOT NULL ,
                              crops VARCHAR(256) NOT NULL ,
                              FOREIGN KEY (user_id) REFERENCES users(user_id)
);

