package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.Exception.BusinessException;
import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dao.ItemRepository;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.ItemTypeValidatorImpl;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.ItemValidatorImpl;
import com.apmc.apmcSpringBoot.model.Item;
import com.apmc.apmcSpringBoot.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
        Item item = null;
        try{
            item = itemRepository.findById(itemId).get();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return item;
    }

    @Override
    public List<Item> findByItemTypeId(int itemTypeId){
        return itemRepository.findByItemTypeItemTypeId(itemTypeId);
    }

    @Override
    public Response addItem(Item item) {
        ItemValidatorImpl itemValidator = new ItemValidatorImpl();
        ValidatorResponse validatorResponse = itemValidator.checkItem(item);

        if(!validatorResponse.isStatus()){
            throw new ValidatorException(validatorResponse.getMessage());
        }
        try{
            itemRepository.save(item);
            return new Response(200, "Ok", System.currentTimeMillis(), true);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return null;
        }
    }

    @Override
    public String deleteItem(int itemId) {
        Item item = itemRepository.findById(itemId).orElse(null);
        if(item == null){
            return "Item doesn't exists";
        }
        itemRepository.deleteById(itemId);
        return "deleted";
    }

}
