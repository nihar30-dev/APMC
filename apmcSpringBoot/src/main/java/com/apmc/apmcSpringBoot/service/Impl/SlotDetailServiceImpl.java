package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dao.SlotDetailRepository;
import com.apmc.apmcSpringBoot.dao.validator.SlotDetailValidator;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.SlotDetailValidatorImpl;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.UserDetailValidatorImpl;
import com.apmc.apmcSpringBoot.model.SlotDetail;
import com.apmc.apmcSpringBoot.model.UserDetail;
import com.apmc.apmcSpringBoot.service.SlotDetailService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class SlotDetailServiceImpl implements SlotDetailService {

    private SlotDetailRepository slotDetailRepository;

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
    public ResponseEntity<SlotDetail> addSlotDetail(SlotDetail slotDetail) {
        SlotDetailValidator slotDetailValidator = new SlotDetailValidatorImpl(slotDetailRepository);

        ValidatorResponse validatorResponse = slotDetailValidator.checkSlotDetail(slotDetail);

        if(!validatorResponse.isStatus())
            throw new ValidatorException(validatorResponse.getMessage());
        try{
            slotDetailRepository.save(slotDetail);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return null;
    }

    @Override
    public String deleteSlotDetail(int slotDetailId) {
        slotDetailRepository.delete(slotDetailRepository.findById(slotDetailId).get());
        return "deleted";
    }

    @Override
    public List<SlotDetail> findBySlotDate(Date date) {
        return slotDetailRepository.findBySlotDate(date);
    }
}
