ALTER TABLE shops RENAME COLUMN user_id to owner_id;

ALTER TABLE agent ADD created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE daily_rates ADD created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE item_type ADD created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE items ADD created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE notification ADD modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE shops ADD created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE slot_details ADD created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE slots ADD created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE user_details ADD created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE users ADD created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE users_roles ADD created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ADD modified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP;