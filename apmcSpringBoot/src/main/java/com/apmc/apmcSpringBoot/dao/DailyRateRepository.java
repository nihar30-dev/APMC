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
}
