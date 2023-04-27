package com.apmc.apmcSpringBoot.item.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.item.Item;
import com.apmc.apmcSpringBoot.item.itemType.ItemType;

public class ItemValidatorImpl implements ItemValidator {
    public ItemValidatorImpl(){
    }

    @Override
    public ValidatorResponse checkItem(Item item){
        String msg = "";
        ValidatorResponse vr1 = checkItemName(item.getItemName());
        if (!vr1.isStatus()){
            msg += vr1.getMessage();
        }
        vr1 = checkItemType(item.getItemType());
        if (!vr1.isStatus()){
            msg += ", " + vr1.getMessage();
        }
        if(msg == ""){
            return new ValidatorResponse(true, "OK");
        } else{
            msg += " required";
            return new ValidatorResponse(false, msg);
        }
    }
    @Override
    public ValidatorResponse checkItemName(String itemName) {
        if (itemName.length() > 0) {
            return new ValidatorResponse(true, "Ok");
        } else {
            return new ValidatorResponse(false, "Item Name");
        }
    }

    @Override
    public ValidatorResponse checkItemType(ItemType itemType) {
        if(itemType == null){
            return new ValidatorResponse(false, "Item Type");
        }
        try{
            int a = itemType.getItemTypeId();
            if(a == 0){
                return new ValidatorResponse(false, "Item Type Id");
            }
        }catch (Exception e){
            return new ValidatorResponse(false, "Item Type Id");
        }
        return new ValidatorResponse(true, "Ok");
    }
}
