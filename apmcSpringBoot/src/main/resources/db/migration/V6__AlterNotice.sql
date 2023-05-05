ALTER TABLE notification
ADD COLUMN start_date DATE DEFAULT (CURRENT_DATE()),
ADD COLUMN end_date DATE DEFAULT (DATE_ADD(CURRENT_DATE(), INTERVAL 7 DAY));