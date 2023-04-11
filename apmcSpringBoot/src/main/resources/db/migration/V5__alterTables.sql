

ALTER TABLE daily_income DROP CONSTRAINT daily_income_ibfk_2 ;


ALTER TABLE slots DROP COLUMN available_slots;


ALTER TABLE slot_details ADD COLUMN name VARCHAR(50) NOT NULL ,ADD COLUMN contact BIGINT , ADD COLUMN district VARCHAR(20) , ADD COLUMN taluka VARCHAR(20) , ADD COLUMN village VARCHAR(20);