INSERT INTO `roles` (`name`) VALUES ('USER');
INSERT INTO `roles` (`name`) VALUES ('EMPLOYEE');
INSERT INTO `roles` (`name`) VALUES ('AGENT');
INSERT INTO `roles` (`name`) VALUES ('ADMIN');

INSERT INTO `users` (`username`, `password`, contact) VALUES ('patrick', '$2a$10$cTUErxQqYVyU2qmQGIktpup5chLEdhD2zpzNEyYqmxrHHJbSNDOG.', '9104249260');
INSERT INTO `users` (`username`, `password`, contact) VALUES ('alex', '$2a$10$.tP2OH3dEG0zms7vek4ated5AiQ.EGkncii0OpCcGq4bckS9NOULu', '9104249261');
INSERT INTO `users` (`username`, `password`, contact) VALUES ('john', '$2a$10$E2UPv7arXmp3q0LzVzCBNeb4B4AtbTAGjkefVDnSztOwE7Gix6kea', '9104249262');
INSERT INTO `users` (`username`, `password`, contact) VALUES ('namhm', '$2a$10$GQT8bfLMaLYwlyUysnGwDu6HMB5G.tin5MKT/uduv2Nez0.DmhnOq', '9104249263');
INSERT INTO `users` (`username`, `password`, contact) VALUES ('admin', '$2a$10$IqTJTjn39IU5.7sSCDQxzu3xug6z/LPU6IF0azE/8CkHCwYEnwBX.', '9104249264');

INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (1, 1); -- user patrick has role USER
INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (2, 2); -- user alex has role CREATOR
INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (3, 3); -- user john has role EDITOR
INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (4, 2); -- user namhm has role CREATOR
INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (4, 3); -- user namhm has role EDITOR
INSERT INTO `users_roles` (`user_id`, `role_id`) VALUES (5, 4); -- user admin has role ADMIN