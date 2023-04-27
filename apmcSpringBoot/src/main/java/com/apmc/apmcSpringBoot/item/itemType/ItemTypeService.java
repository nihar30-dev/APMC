package com.apmc.apmcSpringBoot.item.itemType;

import com.apmc.apmcSpringBoot.item.itemType.ItemType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ItemTypeService {

    public List<ItemType> getAllItemTypes();

    public ItemType getItemTypesById(int itemTypeId);

    public ResponseEntity<ItemType> addItemType(ItemType itemType);

    public String deleteItemType(int ItemTypeId);

}
