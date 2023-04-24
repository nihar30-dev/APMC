alter table slot_details drop constraint slot_details_ibfk_3;
alter table slot_details drop column item_id;
alter table slot_details add column slot_id int not null;
alter table slot_details add constraint foreign key(slot_id) references slots(slot_id);