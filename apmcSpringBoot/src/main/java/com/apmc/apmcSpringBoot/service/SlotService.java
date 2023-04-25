package com.apmc.apmcSpringBoot.service;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.model.Slots;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.Optional;


public interface SlotService {
    public List<Slots> getAllSlotsByDate(Date date);
    public Response addItemSlot(Date date, Slots slot) throws ParseException;
    public Slots getSlotById(int slotId);
    public List<Slots> getAllSlots();
    public String deleteSlot(int slotId);
    public Slots slotExistForDateAndItem(Date date, int itemId);
}
