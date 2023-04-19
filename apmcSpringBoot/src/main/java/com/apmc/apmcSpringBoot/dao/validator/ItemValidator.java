package com.apmc.apmcSpringBoot.dao.validator;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.model.Item;
import com.apmc.apmcSpringBoot.model.ItemType;

public interface ItemValidator {

    public ValidatorResponse checkItem(Item item);

    public ValidatorResponse checkItemName(String itemName);

    public ValidatorResponse checkItemType(ItemType itemType);

}
