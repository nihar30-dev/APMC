package com.apmc.apmcSpringBoot.item.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.item.Item;
import com.apmc.apmcSpringBoot.item.itemType.ItemType;

public interface ItemValidator {

    public ValidatorResponse checkItem(Item item);

    public ValidatorResponse checkItemName(String itemName);

    public ValidatorResponse checkItemType(ItemType itemType);

}
