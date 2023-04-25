package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dao.SlotsRepository;
import com.apmc.apmcSpringBoot.dao.validator.SlotsValidator;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.DailyRatesValidatorImpl;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.SlotsValidatorImpl;
import com.apmc.apmcSpringBoot.model.DailyRates;
import com.apmc.apmcSpringBoot.model.Slots;
import com.apmc.apmcSpringBoot.service.SlotService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class SlotServiceImpl implements SlotService {

    @Autowired
    private SlotsRepository slotsRepository;

    @Override
    @Transactional
    public List<Slots> getAllSlots() {
        return slotsRepository.findAll();
    }

    @Override
    @Transactional
    public List<Slots> getAllSlotsByDate(Date date) {
        List<Slots> slots = null;
        try {
            slots = slotsRepository.getAllSlotsByDate(date);
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
        return slots;
    }

    @Override
    @Transactional
    public Response addItemSlot(Date date, Slots slot) throws ParseException, ValidatorException {

//        Slots slot = slotsRepository.save(slots);
        SlotsValidator slotsValidator = new SlotsValidatorImpl();
        ValidatorResponse validatorResponse = slotsValidator.checkSlot(slot);
        System.out.println(date);
        if(!validatorResponse.isStatus()){
            throw new ValidatorException(validatorResponse.getMessage());
        }

        Slots checkedSlot =  slotsRepository.slotExistForDateAndItem(date, slot.getItem().getItemId());
        if(checkedSlot == null){
            slotsRepository.save(slot);
        }else{
            checkedSlot.setTotalQuantity(checkedSlot.getTotalQuantity() + slot.getTotalQuantity());
        }
        return new Response(200, "Ok", System.currentTimeMillis(), true);
    }

    @Override
    @Transactional
    public Slots getSlotById(int slotId) {
        Slots slot = null;
        try{
            slot = slotsRepository.findById(slotId).get();
        }catch(Exception e){
            System.out.println(e.getMessage());
        }

        return slot;
    }
    @Override
    @Transactional
    public String deleteSlot(int slotId) {
        slotsRepository.deleteById(slotId);
        return "deleted";
    }

    @Override
    @Transactional
    public Slots slotExistForDateAndItem(Date date, int itemId) {
        Slots slot = null;
        try{
            slot = slotsRepository.slotExistForDateAndItem(date, itemId);
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
        return slot;
    }
}
