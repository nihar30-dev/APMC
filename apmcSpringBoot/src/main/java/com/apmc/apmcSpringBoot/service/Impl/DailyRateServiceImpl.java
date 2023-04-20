package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dao.DailyRateRepository;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.DailyRatesValidatorImpl;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.ItemValidatorImpl;
import com.apmc.apmcSpringBoot.model.DailyRates;
import com.apmc.apmcSpringBoot.service.DailyRateService;
import org.springframework.beans.factory.annotation.Autowired;
import java.text.ParseException;

import org.springframework.http.ResponseEntity;
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
    public Response addDailyItemRates(DailyRates dailyRate) throws ParseException {

        DailyRatesValidatorImpl dailyRatesValidator = new DailyRatesValidatorImpl();
        ValidatorResponse validatorResponse = dailyRatesValidator.checkDailyRate(dailyRate);

        if(!validatorResponse.isStatus()){
            throw new ValidatorException(validatorResponse.getMessage());
        }

            DailyRates dailyRates =  dailyRateRepository.checkIfParticularItemIsPresentForADate(dailyRate.getItem().getItemId(), dailyRate.getDay());
            if(dailyRates == null){
                dailyRateRepository.save(dailyRate);
                return new Response(200, "Ok", System.currentTimeMillis(), true);
            }else{
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date date = dateFormat.parse(dailyRates.getDay().toString());
                System.out.println(date);
                if(dailyRate.getDay().compareTo(date)==0){
                    if(dailyRate.getItem().getItemId() == dailyRates.getItem().getItemId()){
                        dailyRate.setRateId(dailyRates.getRateId());
                    }
                dailyRateRepository.save(dailyRate);
                return new Response(200, "Ok", System.currentTimeMillis(), true);}
        }
        return new Response(200, "Ok", System.currentTimeMillis(), true);
    }

    @Override
    public DailyRates getDailyRatesById(int rateId) {
        return dailyRateRepository.findById(rateId).get();
    }

}
