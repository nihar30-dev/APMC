package com.apmc.apmcSpringBoot.dao.validator.validatorImpl;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dao.validator.DailyRatesValidator;
import com.apmc.apmcSpringBoot.model.DailyRates;
import com.apmc.apmcSpringBoot.model.Item;

import java.time.LocalDate;

import java.sql.Date;

public class DailyRatesValidatorImpl implements DailyRatesValidator {
    public DailyRatesValidatorImpl(){
    }
    @Override
    public ValidatorResponse checkDailyRate(DailyRates dailyRates) {
        String msg = "";
        ValidatorResponse vr = checkDate((Date) dailyRates.getDay());
        if (!vr.isStatus()){
            msg += vr.getMessage();
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
    public ValidatorResponse checkDate(Date date) {
//        LocalDate currentDate = LocalDate.now();
//        Date date2 = java.sql.Date.valueOf(currentDate);
//        int a = date.compareTo(date2);
//        if (a>0){
//            return new ValidatorResponse(false, "Valid Date");
//        }else{
        return new ValidatorResponse(true, "Ok");
//    }
//        return null;
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


    /*
    public ValidatorResponse checkItem(Item item){
        String msg = "";
        ValidatorResponse vr1 = checkItemName(item.getItemName());
        if (!vr1.isStatus()){
            msg += vr1.getMessage();

        }

        vr1 = checkItemType(item.getItemType());
        if (!vr1.isStatus()){
            msg += ", " + vr1.getMessage();
        }
        if(msg == ""){
            return new ValidatorResponse(true, "OK");
        } else{
            msg += " required";
            return new ValidatorResponse(false, msg);
        }
    }
    @Override
    public ValidatorResponse checkItemName(String itemName) {
        if (itemName.length() > 0) {
            return new ValidatorResponse(true, "Ok");
        } else {
            return new ValidatorResponse(false, "Item Name");
        }
    }

    @Override
    public ValidatorResponse checkItemType(ItemType itemType) {
        if(itemType == null){
            return new ValidatorResponse(false, "Item Type");
        }
        try{
            int a = itemType.getItemTypeId();
            if(a == 0){
                return new ValidatorResponse(false, "Item Type Id");
            }
        }catch (Exception e){
            return new ValidatorResponse(false, "Item Type Id");
        }
        return new ValidatorResponse(true, "Ok");
    }
    */

}
