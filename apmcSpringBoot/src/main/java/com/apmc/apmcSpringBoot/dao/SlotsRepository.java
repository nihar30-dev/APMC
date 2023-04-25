package com.apmc.apmcSpringBoot.dao;

import com.apmc.apmcSpringBoot.model.Slots;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface SlotsRepository extends JpaRepository<Slots, Integer> {
    @Query(value = "SELECT * FROM Slots s WHERE s.slot_date = ?1", nativeQuery = true)
    public List<Slots> getAllSlotsByDate(Date date);

    @Query(value = "SELECT * FROM Slots s WHERE s.slot_date = ?1 AND s.item_id = ?2", nativeQuery = true)
    public Slots slotExistForDateAndItem(Date date, int itemId);
}
