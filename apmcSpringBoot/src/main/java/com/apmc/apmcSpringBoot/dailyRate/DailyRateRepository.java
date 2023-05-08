package com.apmc.apmcSpringBoot.dailyRate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface DailyRateRepository extends JpaRepository<DailyRates, Integer> {

    @Query("SELECT dr FROM DailyRates dr WHERE dr.day = ?1")
    public List<DailyRates> getDailyRatesForAllItems(Date date);



    @Query("SELECT dr FROM DailyRates dr WHERE dr.item.itemId = ?1 AND dr.day = ?2")
    public DailyRates checkIfParticularItemIsPresentForADate(int item_id, Date date);

    @Query("SELECT dr FROM DailyRates dr WHERE dr.day = ?1 AND dr.item.itemType.itemTypeId= ?2")
    public List<DailyRates> getDailyRatesByItemType(Date date, int typeId);
}