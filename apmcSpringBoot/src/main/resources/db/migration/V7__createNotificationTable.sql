CREATE TABLE notification (notification_id INT PRIMARY KEY AUTO_INCREMENT ,
                           notification_heading VARCHAR(128),
                           notification_detail VARCHAR(1024) ,
                           created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP);

