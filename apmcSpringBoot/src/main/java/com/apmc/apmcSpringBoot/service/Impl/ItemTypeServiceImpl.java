package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.dao.ItemTypeRepository;
import com.apmc.apmcSpringBoot.model.Agent;
import com.apmc.apmcSpringBoot.model.ItemType;
import com.apmc.apmcSpringBoot.service.ItemTypeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemTypeServiceImpl implements ItemTypeService {

    @Autowired
    private ItemTypeRepository itemTypeRepository;

    @Override
    @Transactional
    public List<ItemType> getAllItemTypes() {
        return itemTypeRepository.findAll();
    }

    @Override
    public ItemType getItemTypesById(int itemTypeId) {
        return itemTypeRepository.findById(itemTypeId).get();
    }

    @Override
    public ItemType addItemType(ItemType itemType) {

        return itemTypeRepository.save(itemType);
    }


    @Override
    public String deleteItemType(int ItemTypeId) {
        itemTypeRepository.delete(itemTypeRepository.findById(ItemTypeId).get());
        return "deleted";
    }
}
