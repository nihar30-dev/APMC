package com.apmc.apmcSpringBoot.dailyRate.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dailyRate.DailyRates;
import com.apmc.apmcSpringBoot.item.Item;

import java.text.SimpleDateFormat;
import java.time.LocalDate;

public class DailyRatesValidatorImpl implements DailyRatesValidator {
    public DailyRatesValidatorImpl(){
    }
    @Override
    public ValidatorResponse checkDailyRate(DailyRates dailyRates) {
        String msg = "";
        ValidatorResponse vr = checkPrices(dailyRates);
        if (!vr.isStatus()){
            msg += vr.getMessage();
        }

        LocalDate NewlocalDate = LocalDate.parse( new SimpleDateFormat("yyyy-MM-dd").format(dailyRates.getDay()));
        vr = checkDate(NewlocalDate);
        if (!vr.isStatus()){
            msg += ", "+ vr.getMessage();
        }

        vr = checkItem(dailyRates.getItem());
        if (!vr.isStatus()){
            msg += ", " + vr.getMessage();
        }
        if(msg == ""){
            return new ValidatorResponse(true, "OK");
        } else{
            msg += " required";
            return new ValidatorResponse(false, msg);
        }
    }

    @Override
    public ValidatorResponse checkDate(LocalDate date) {
        LocalDate currentDate = LocalDate.now();
//        System.out.println("Local date :-------------------------"+currentDate);
//        System.out.println("api se aaye date------------------"+date);
//        System.out.println(date.compareTo(currentDate));
        int a = date.compareTo(currentDate);
        try{
            if (a>0) {
                return new ValidatorResponse(false, "Valid Date");
            }
        }catch (Exception e){
            return new ValidatorResponse(false, "Valid Date");
        }
        return new ValidatorResponse(true, "Ok");

    }

    @Override
    public ValidatorResponse checkItem(Item item) {
        if(item == null){
            return new ValidatorResponse(false, "Item ");
        }
        try{
            int a = item.getItemId();
            if(a == 0){
                return new ValidatorResponse(false, "Item Id");
            }
        }catch (Exception e){
            return new ValidatorResponse(false, "Item Id");
        }
        return new ValidatorResponse(true, "Ok");
    }

    public ValidatorResponse checkPrices(DailyRates dailyRates) {
        try{
            int maxp = dailyRates.getMaxPrice();
            int minp = dailyRates.getMinPrice();
            int avgp = dailyRates.getAvgPrice();
            int q = dailyRates.getQuantity();
            if(maxp == 0 || minp == 0 || avgp == 0 || q == 0){
                return new ValidatorResponse(false, "All fields ");
            }
        }catch (Exception e){
            return new ValidatorResponse(false, "All fields ");
        }
        return new ValidatorResponse(true, "Ok");
    }
}
