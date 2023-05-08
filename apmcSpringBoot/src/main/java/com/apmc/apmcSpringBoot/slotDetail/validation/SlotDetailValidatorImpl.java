package com.apmc.apmcSpringBoot.slotDetail.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.slotDetail.SlotDetailRepository;
import com.apmc.apmcSpringBoot.agent.Agent;
import com.apmc.apmcSpringBoot.slotDetail.SlotDetail;
import com.apmc.apmcSpringBoot.slot.Slots;
import com.apmc.apmcSpringBoot.user.User;

import java.util.Date;

public class SlotDetailValidatorImpl implements SlotDetailValidator {

    private SlotDetailRepository slotDetailRepository;
    public SlotDetailValidatorImpl(SlotDetailRepository slotDetailRepository) {
        this.slotDetailRepository = slotDetailRepository;
    }

    @Override
    public ValidatorResponse checkSlotDetail(SlotDetail slotDetail) {
        String msg = "";
        ValidatorResponse vr1;


        vr1 = checkQuantity(slotDetail.getQuantity());
        if (!vr1.isStatus()){
            msg += vr1.getMessage()+ ", ";
        }

        vr1 = checkUserId(slotDetail.getUser());
        if (!vr1.isStatus()){
            msg += vr1.getMessage() + ", ";
        }

        vr1 = checkAgentId(slotDetail.getAgent());
        if (!vr1.isStatus()){
            msg += vr1.getMessage() + ", ";
        }

        vr1 = checkSlotId(slotDetail.getSlot());
        if (!vr1.isStatus()){
            msg += vr1.getMessage() + ", ";
        }

//        vr1 = checkDate(slotDetail.getSlotDate(), slotDetail);
//        if(!vr1.isStatus()){
//            msg += vr1.getMessage() + ", ";
//        }


        if(msg == ""){
            return new ValidatorResponse(true, "OK");
        } else{
            msg += " required";
            return new ValidatorResponse(false, msg);
        }
    }

    @Override
    public ValidatorResponse checkQuantity(int quantity) {
        if(quantity>0) return new ValidatorResponse(true, "Ok");
        else return new ValidatorResponse(false, "Quantity");

    }

    @Override
    public ValidatorResponse checkUserId(User user) {
        if(user == null){
            return new ValidatorResponse(false, "User ");
        }
        try{
            Long a = user.getId();
            if(a == 0){
                return new ValidatorResponse(false, "User Id ");
            }
        }catch (Exception e){
            return new ValidatorResponse(false, "User Id ");
        }
        return new ValidatorResponse(true, "Ok");
    }

    @Override
    public ValidatorResponse checkAgentId(Agent agent) {
        if(agent == null){
            return new ValidatorResponse(false, "User ");
        }
        try{
            Long a = (long) agent.getAgentId();
            if(a == 0){
                return new ValidatorResponse(false, "User Id ");
            }
        }catch (Exception e){
            return new ValidatorResponse(false, "User Id ");
        }
        return new ValidatorResponse(true, "Ok");
    }

    @Override
    public ValidatorResponse checkSlotId(Slots slot) {
        if(slot == null){
            return new ValidatorResponse(false, "User ");
        }
        try{
            int a = slot.getSlotId();
            if(a == 0){
                return new ValidatorResponse(false, "User Id ");
            }
        }catch (Exception e){
            return new ValidatorResponse(false, "User Id ");
        }
        return new ValidatorResponse(true, "Ok");
    }

    public ValidatorResponse checkDate(Date date, SlotDetail slotDetail){
        if(date==null){
            return new ValidatorResponse(false, "Slot Date ");
        }

        try{
            Date d = slotDetail.getSlot().getSlotDate();
            if(d!=date) return new ValidatorResponse(false, "Valid slot date ");

        }catch (Exception e){
            return new ValidatorResponse(false, "Date is ");
        }
        return new ValidatorResponse(true, "Ok");
    }
}
