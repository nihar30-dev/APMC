package com.apmc.apmcSpringBoot.slot;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.slot.validation.SlotsValidator;
import com.apmc.apmcSpringBoot.slot.validation.SlotsValidatorImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

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
    public List<Slots> findBySlotDate(Date date) {
        List<Slots> slots = null;
        try {
            slots = slotsRepository.findBySlotDate(date);
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
        return slots;
    }

    @Override
    @Transactional
    public Response addItemSlot(Slots slot) throws ParseException, ValidatorException {

        Date date = slot.getSlotDate();
//        slot.setSlotDate(date);
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
            System.out.println(slot.getTotalQuantity());
            slotsRepository.save(checkedSlot);
        }
        return new Response(200, "Ok", System.currentTimeMillis(), true);
    }

    @Override
    @Transactional
    public Slots findBySlotId(int slotId) {
        Slots slot = null;
        try{
            slot = slotsRepository.findBySlotId(slotId);
        }catch(Exception e){
            System.out.println(e.getMessage());
        }

        return slot;
    }
    @Override
    @Transactional
    public boolean deleteSlot(int slotId) {
        Slots slot = slotsRepository.findById(slotId).orElse(null);
        if(slot == null){
            return false;
        }
        slotsRepository.deleteById(slotId);
        return true;
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
