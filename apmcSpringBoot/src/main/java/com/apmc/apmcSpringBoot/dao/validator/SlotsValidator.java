package com.apmc.apmcSpringBoot.dao.validator;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.model.Item;
import com.apmc.apmcSpringBoot.model.Slots;

import java.time.LocalDate;

public interface SlotsValidator {
    public ValidatorResponse checkItem(Item item);
    public ValidatorResponse checkSlot(Slots slot);
    public ValidatorResponse checkDate(LocalDate date);
}
