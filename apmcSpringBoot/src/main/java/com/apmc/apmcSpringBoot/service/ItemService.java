package com.apmc.apmcSpringBoot.service;

import com.apmc.apmcSpringBoot.model.Item;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ItemService {

    public List<Item> getAllItems();

    public Item getItemById(int itemId);

//    public List<Item> getItemByItemType(int itemTypeId);

    public Item addItem(Item item);

    public String deleteItem(int ItemId);

}
