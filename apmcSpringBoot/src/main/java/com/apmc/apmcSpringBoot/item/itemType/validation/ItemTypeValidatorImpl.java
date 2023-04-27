package com.apmc.apmcSpringBoot.item.itemType.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;

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
