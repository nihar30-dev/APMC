package com.apmc.apmcSpringBoot.slotDetail;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.slotDetail.SlotDetail;

import java.text.ParseException;
import java.util.List;

public interface SlotDetailService {
    public List<SlotDetail> getAllSlotDetail();

    public SlotDetail getSlotDetailById(int slotDetailId);

    public Response addSlotDetail(SlotDetail slotDetail);

    public String deleteSlotDetail(int slotDetailId);

    public List<SlotDetail> getSlotDetailByAgentId(int agentId) throws ParseException;

    public List<SlotDetail> getSlotDetailByUserId(int userId) throws ParseException;

}
