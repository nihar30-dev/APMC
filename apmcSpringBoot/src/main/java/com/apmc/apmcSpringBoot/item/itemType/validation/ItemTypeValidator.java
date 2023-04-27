package com.apmc.apmcSpringBoot.item.itemType.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;

public interface ItemTypeValidator {

    public ValidatorResponse checkItemTypeName(String itemTypeName);

}
