package com.apmc.apmcSpringBoot.slot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SlotsRepository extends JpaRepository<Slots, Integer> {

    public List<Slots> findBySlotDate(Date date);

    public Slots findBySlotId(int slotId);


//    @Query(value = "SELECT * FROM slots s WHERE s.slot_date = ?1 AND s.item_id = ?2", nativeQuery = true)
    @Query("SELECT sl FROM Slots sl WHERE sl.slotDate = ?1 AND sl.item.itemId=?2")
    public Slots slotExistForDateAndItem(Date date, int itemId);


}
