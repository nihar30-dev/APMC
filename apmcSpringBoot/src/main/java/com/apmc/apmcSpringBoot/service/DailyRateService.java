package com.apmc.apmcSpringBoot.service;

import com.apmc.apmcSpringBoot.model.DailyRates;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

@Service
public interface DailyRateService {

    public List<DailyRates> getAllItemsByDate(Date date);

    public DailyRates addDailyItemRates(DailyRates dailyRate) throws ParseException;

    public DailyRates getDailyRatesById(int rateId);



}
