package com.apmc.apmcSpringBoot.dao.validator;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.model.DailyRates;
import com.apmc.apmcSpringBoot.model.Item;
import com.apmc.apmcSpringBoot.model.ItemType;

import java.sql.Date;
import java.time.LocalDate;

public interface DailyRatesValidator {

    public ValidatorResponse checkDate(LocalDate date);

    public ValidatorResponse checkItem(Item item);

    public ValidatorResponse checkDailyRate(DailyRates dailyRates);

}
