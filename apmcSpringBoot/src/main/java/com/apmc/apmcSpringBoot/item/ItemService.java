package com.apmc.apmcSpringBoot.item;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.item.Item;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ItemService {

    public List<Item> getAllItems();

    public Item getItemById(int itemId);

    public List<Item> findByItemTypeId(int itemTypeId);


    public Response addItem(Item item);

    public String deleteItem(int ItemId);


}
