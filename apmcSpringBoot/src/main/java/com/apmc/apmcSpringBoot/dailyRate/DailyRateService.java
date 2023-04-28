package com.apmc.apmcSpringBoot.dailyRate;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.dailyRate.DailyRates;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

@Service
public interface DailyRateService {

    public List<DailyRates> getAllItemsByDate(Date date);

    public Response addDailyItemRates(DailyRates dailyRate) throws ParseException;

    public DailyRates getDailyRatesById(int rateId);
    public List<DailyRates> getAllItemsByDateAndType(Date date, int typeId);


}
