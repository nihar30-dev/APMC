package com.apmc.apmcSpringBoot.dailyRate;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dailyRate.validation.DailyRatesValidatorImpl;
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
    public List<DailyRates> getAllDailyRates() {
        return dailyRateRepository.findAll();
    }

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
        DailyRates dailyRates = null;
        try{
            dailyRates = dailyRateRepository.findById(rateId).get();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return dailyRates;
    }

    @Override
    public List<DailyRates> getAllItemsByDateAndType(Date date, int typeId) {
        return dailyRateRepository.getDailyRatesByItemType(date, typeId);
    }

}
