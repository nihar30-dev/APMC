package com.apmc.apmcSpringBoot.dto.converter;


import com.apmc.apmcSpringBoot.dto.ItemDTO;
import com.apmc.apmcSpringBoot.model.Item;
import org.springframework.stereotype.Component;

@Component
public class ItemConverter {

    public ItemDTO entityToDto(Item item){
        ItemDTO itemDTO = new ItemDTO();
        itemDTO.setItemName(item.getItemName());
        itemDTO.setItemType(item.getItemType());
        return itemDTO;
    }

    public Item DtoToEntity(ItemDTO itemDTO){
        Item item = new Item();
        item.setItemName(itemDTO.getItemName());
        item.setItemType(itemDTO.getItemType());
        System.out.println(item);
        return item;
    }
}
