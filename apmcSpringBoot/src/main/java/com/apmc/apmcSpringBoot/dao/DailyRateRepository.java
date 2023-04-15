package com.apmc.apmcSpringBoot.dao;

import com.apmc.apmcSpringBoot.model.DailyRates;
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

//    @Query("UPDATE dr FROM DailyRates dr SET minPrice = ?1, max_price = ?2, avg_price = ?3, quantity = ?4 )
//    public DailyRates DailyRateIfExist();
}
