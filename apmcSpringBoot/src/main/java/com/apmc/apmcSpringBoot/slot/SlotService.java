package com.apmc.apmcSpringBoot.slot;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.slot.Slots;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

public interface SlotService {
    public List<Slots> findBySlotDate(Date date);
    public Response addItemSlot(Date date, Slots slot) throws ParseException;
    public Slots findBySlotId(int slotId);
    public List<Slots> getAllSlots();
    public String deleteSlot(int slotId);
    public Slots slotExistForDateAndItem(Date date, int itemId);
}
