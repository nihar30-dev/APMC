package com.apmc.apmcSpringBoot.item;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.item.validation.ItemValidatorImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    @Transactional
    public List<Item> getAllItems(){
        return itemRepository.findAll();
    }

    @Override
    @Transactional
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
    @Transactional
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
            if(itemRepository.existsByItemName(item.getItemName())){
                return new Response(400,"Item already exists",System.currentTimeMillis(),true);
            }
            itemRepository.save(item);
            return new Response(200, "Ok", System.currentTimeMillis(), true);
        }catch (Exception e){
            System.out.println(e.getMessage());
            return new Response(400,e.getMessage(),System.currentTimeMillis(), false);
        }
    }

    @Override
    @Transactional
    public String deleteItem(int itemId) {
        Item item = itemRepository.findById(itemId).orElse(null);
        if(item == null){
            return "Item doesn't exists";
        }
        itemRepository.deleteById(itemId);
        return "deleted";
    }

}
