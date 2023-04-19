package com.apmc.apmcSpringBoot.dao.validator.validatorImpl;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dao.validator.ItemTypeValidator;

public class ItemTypeValidatorImpl implements ItemTypeValidator {

    @Override
    public ValidatorResponse checkItemTypeName(String itemTypeName) {
        if (itemTypeName.length() > 0) {
            return new ValidatorResponse(true, "Ok");
        } else {
            return new ValidatorResponse(false, "ItemType Name is required");
        }
    }
}
