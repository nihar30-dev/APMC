package com.apmc.apmcSpringBoot.dailyRate.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dailyRate.DailyRates;
import com.apmc.apmcSpringBoot.item.Item;

import java.time.LocalDate;

public interface DailyRatesValidator {

    public ValidatorResponse checkDate(LocalDate date);

    public ValidatorResponse checkItem(Item item);

    public ValidatorResponse checkDailyRate(DailyRates dailyRates);

}
