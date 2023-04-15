package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.dao.ItemRepository;
import com.apmc.apmcSpringBoot.dao.ItemTypeRepository;
import com.apmc.apmcSpringBoot.model.Item;
import com.apmc.apmcSpringBoot.model.ItemType;
import com.apmc.apmcSpringBoot.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public List<Item> getAllItems(){
        return itemRepository.findAll();
    }

    @Override
    public Item getItemById(int itemId){
        return itemRepository.findById(itemId).get();
    }


    @Override
    public List<Item> getItemByItemType(int itemTypeId){
        return itemRepository.findItemByItemTypeId(itemTypeId);
    }

    @Override
    public Item addItem(Item item) {
        return itemRepository.save(item);
    }

    @Override
    public String deleteItem(int itemId) {
        itemRepository.deleteById(itemId);
        return "deleted";
    }

}
