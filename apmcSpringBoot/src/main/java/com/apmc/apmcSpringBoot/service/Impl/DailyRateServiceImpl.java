package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.dao.DailyRateRepository;
import com.apmc.apmcSpringBoot.model.DailyRates;
import com.apmc.apmcSpringBoot.service.DailyRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class DailyRateServiceImpl implements DailyRateService {

    @Autowired
    private DailyRateRepository dailyRateRepository;
    @Override
    public List<DailyRates> getAllItemsByDate(Date date) {
        return dailyRateRepository.getDailyRatesForAllItems(date);
    }

    @Override
    public void addDailyItemRates(DailyRates dailyRate) {

    }
}
