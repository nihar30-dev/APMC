package com.apmc.apmcSpringBoot.service;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.model.SlotDetail;

import java.util.Date;
import java.util.List;

public interface SlotDetailService {
    public List<SlotDetail> getAllSlotDetail();

    public SlotDetail getSlotDetailById(int slotDetailId);

    public Response addSlotDetail(SlotDetail slotDetail);

    public String deleteSlotDetail(int slotDetailId);

    public List<SlotDetail> findBySlotDate(Date date);
}
