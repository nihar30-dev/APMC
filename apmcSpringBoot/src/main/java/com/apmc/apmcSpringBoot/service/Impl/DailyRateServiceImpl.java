package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.dao.DailyRateRepository;
import com.apmc.apmcSpringBoot.model.DailyRates;
import com.apmc.apmcSpringBoot.service.DailyRateService;
import org.springframework.beans.factory.annotation.Autowired;
import java.text.ParseException;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
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
    public DailyRates addDailyItemRates(DailyRates dailyRate) throws ParseException {
        System.out.println(dailyRate.getDay());

        DailyRates dailyRates =  dailyRateRepository.checkIfParticularItemIsPresentForADate(dailyRate.getItem().getItemId(), dailyRate.getDay());
        if(dailyRates == null){
            return dailyRateRepository.save(dailyRate);
        }else{
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date date = dateFormat.parse(dailyRates.getDay().toString());
            System.out.println(date);
            if(dailyRate.getDay().compareTo(date)==0){

                if(dailyRate.getItem().getItemId() == dailyRates.getItem().getItemId()){
                    dailyRate.setRateId(dailyRates.getRateId());
                }
                return dailyRateRepository.save(dailyRate);
            }
        }
        return null;
    }

    @Override
    public DailyRates getDailyRatesById(int rateId) {
        return dailyRateRepository.findById(rateId).get();
    }

}
