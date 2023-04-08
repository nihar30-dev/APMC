
CREATE TABLE shops (shop_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT ,
                    shop_no VARCHAR(10) NOT NULL,
                    shop_name VARCHAR(60) NOT NULL UNIQUE ,
                    contact BIGINT NOT NULL,
                    user_id INT NOT NULL,
                    FOREIGN KEY(user_id) REFERENCES users(user_id));


CREATE TABLE employee_position (position_type_id INT PRIMARY KEY AUTO_INCREMENT,
                                position_type_name VARCHAR(20) NOT NULL );

CREATE TABLE employee_user_position (employee_id INT  ,
                                     employee_position_id INT ,
                                     FOREIGN KEY (employee_position_id) REFERENCES employee_position(position_type_id),
                                     FOREIGN KEY (employee_id) REFERENCES users(user_id));



CREATE TABLE item_type (item_type_id INT PRIMARY KEY AUTO_INCREMENT ,
                        item_type_name VARCHAR(20) NOT NULL );

CREATE TABLE items (item_id INT PRIMARY KEY AUTO_INCREMENT ,
                    item_name VARCHAR(20),
                    item_type_id INT ,
                    FOREIGN KEY (item_type_id) REFERENCES item_type(item_type_id));

CREATE TABLE daily_rates (item_id INT NOT NULL ,
                          min_price INT NOT NULL ,
                          max_price INT NOT NULL ,
                          avg_price INT NOT NULL ,
                          created_at TIMESTAMP,
                          FOREIGN KEY (item_id) REFERENCES items(item_id)
);

CREATE TABLE daily_income (item_id INT NOT NULL ,
                           quantity INT NOT NULL ,
                           item_type_id INT NOT NULL,
                           FOREIGN KEY (item_id) REFERENCES items(item_id),
                           FOREIGN KEY (item_type_id) REFERENCES item_type(item_type_id));

CREATE TABLE slots (item_id INT NOT NULL ,
                    available_slots INT ,
                    slot_date DATE,
                    FOREIGN KEY (item_id) REFERENCES items(item_id));

CREATE TABLE slot_details (slot_id INT  PRIMARY KEY AUTO_INCREMENT ,
                           user_id INT NOT NULL ,
                           shop_id INT NOT NULL ,
                           item_id INT NOT NULL ,
                           quantity INT NOT NULL ,
                           slot_date DATE NOT NULL,
                           FOREIGN KEY (user_id) REFERENCES users(user_id),
                           FOREIGN KEY (shop_id) REFERENCES shops(shop_id),
                           FOREIGN KEY (item_id) REFERENCES items(item_id));