package com.apmc.apmcSpringBoot.dto.converter;

import com.apmc.apmcSpringBoot.dto.ItemTypeDTO;
import com.apmc.apmcSpringBoot.model.ItemType;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

@Component
public class ItemTypeConverter {

    public ItemTypeDTO entityToDto(ItemType itemType){
        ItemTypeDTO itemTypeDTO = new ItemTypeDTO();
        itemTypeDTO.setItemTypeName(itemType.getItemTypeName());
        return itemTypeDTO;
    }

    public ItemType DtoToEntity(ItemTypeDTO itemTypeDTO){
        ItemType itemType = new ItemType();
        itemType.setItemTypeName(itemTypeDTO.getItemTypeName());
        System.out.println(itemType);
        return itemType;
    }

}
