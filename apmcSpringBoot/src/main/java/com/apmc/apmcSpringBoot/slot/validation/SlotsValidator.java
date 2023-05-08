package com.apmc.apmcSpringBoot.slot.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.item.Item;
import com.apmc.apmcSpringBoot.slot.Slots;

import java.time.LocalDate;

public interface SlotsValidator {
    public ValidatorResponse checkItem(Item item);
    public ValidatorResponse checkSlot(Slots slot);
    public ValidatorResponse checkDate(LocalDate date);
}
