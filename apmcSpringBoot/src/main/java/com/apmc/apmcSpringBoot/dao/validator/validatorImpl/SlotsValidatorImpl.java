package com.apmc.apmcSpringBoot.dao.validator.validatorImpl;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dao.validator.SlotsValidator;
import com.apmc.apmcSpringBoot.model.Item;
import com.apmc.apmcSpringBoot.model.Slots;

import java.text.SimpleDateFormat;
import java.time.LocalDate;

public class SlotsValidatorImpl implements SlotsValidator {
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

    @Override
    public ValidatorResponse checkSlot(Slots slot) {
        String msg = "";
        ValidatorResponse vr = checkQuantity(slot);
        if (!vr.isStatus()){
            msg += vr.getMessage();
        }

        LocalDate NewlocalDate = LocalDate.parse( new SimpleDateFormat("yyyy-MM-dd").format(slot.getSlotDate()));
        vr = checkDate(NewlocalDate);
        if (!vr.isStatus()){
            msg += ", "+ vr.getMessage();
        }

        vr = checkItem(slot.getItem());
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
        int a = date.compareTo(currentDate);
        try{
            if (a<0) {
                return new ValidatorResponse(false, "Valid Date");
            }
        }catch (Exception e){
            return new ValidatorResponse(false, "Valid Date");
        }
        return new ValidatorResponse(true, "Ok");
    }

    public ValidatorResponse checkQuantity(Slots slot){

        try{
            int quantity = slot.getTotalQuantity();
            if(quantity <= 0){
                return new ValidatorResponse(false, "Quantity ");
            }
        }catch(Exception e){
            return new ValidatorResponse(false, "Quantity ");
        }
        return new ValidatorResponse(true, "Ok");
    }
}
