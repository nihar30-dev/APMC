package com.apmc.apmcSpringBoot.slotDetail;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.slot.SlotsRepository;
import com.apmc.apmcSpringBoot.slotDetail.validation.SlotDetailValidator;
import com.apmc.apmcSpringBoot.slotDetail.validation.SlotDetailValidatorImpl;
import com.apmc.apmcSpringBoot.slot.Slots;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SlotDetailServiceImpl implements SlotDetailService {

    @Autowired
    private SlotDetailRepository slotDetailRepository;

    @Autowired
    private SlotsRepository slotsRepository;

    @Override
    public List<SlotDetail> getAllSlotDetail() {
        return slotDetailRepository.findAll();
    }

    @Override
    public SlotDetail getSlotDetailById(int slotDetailId) {
        SlotDetail slotDetail = null;
        try{
            slotDetail = slotDetailRepository.findById(slotDetailId).get();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return slotDetail;
    }

    @Override
    public Response addSlotDetail(SlotDetail slotDetail) {
        SlotDetailValidator slotDetailValidator = new SlotDetailValidatorImpl(slotDetailRepository);

        ValidatorResponse validatorResponse = slotDetailValidator.checkSlotDetail(slotDetail);
        int id = slotDetail.getSlot().getSlotId();
        Slots slot = slotsRepository.findBySlotId(id);


        if(slot.getTotalQuantity() - slot.getBookedQuantity() <=0){
            return new Response(400, "All slots are booked on this date", System.currentTimeMillis(),false);
        }
        else{
            slot.setBookedQuantity(slot.getBookedQuantity() + slotDetail.getQuantity());


            slotsRepository.save(slot);
            System.out.println("slot booked");
        }
        if(!validatorResponse.isStatus())
            throw new ValidatorException(validatorResponse.getMessage());

        try{
            SlotDetail slotDetail1 = slotDetailRepository.save(slotDetail);
            return new Response(200, "ok", System.currentTimeMillis(), true);
        }catch (Exception e){
            return new Response(400,e.getMessage(),System.currentTimeMillis(), false);
        }

    }

    @Override
    public String deleteSlotDetail(int slotDetailId) {
        SlotDetail slotDetail = slotDetailRepository.findById(slotDetailId).orElse(null);
        if(slotDetail == null){
            return "Slot detail doesn't exists";
        }
        slotDetailRepository.delete(slotDetailRepository.findById(slotDetailId).get());
        return "deleted";
    }
}
