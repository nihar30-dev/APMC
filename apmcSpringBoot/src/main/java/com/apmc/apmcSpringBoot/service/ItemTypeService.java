package com.apmc.apmcSpringBoot.service;

import com.apmc.apmcSpringBoot.model.ItemType;
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
