package com.apmc.apmcSpringBoot.dao.validator;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;

public interface ItemTypeValidator {

    public ValidatorResponse checkItemTypeName(String itemTypeName);

}
