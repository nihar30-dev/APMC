package com.apmc.apmcSpringBoot.item.itemType;

import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.item.itemType.validation.ItemTypeValidatorImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
        ItemType itemType = null;
        try{
            itemType = itemTypeRepository.findById(itemTypeId).get();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return itemType;
    }

    @Override
    public ResponseEntity<ItemType> addItemType(ItemType itemType) throws ValidatorException {

        ItemTypeValidatorImpl itemTypeValidator = new ItemTypeValidatorImpl();
        ValidatorResponse validatorResponse = itemTypeValidator.checkItemTypeName(itemType.getItemTypeName());

        if(!validatorResponse.isStatus())
            throw new ValidatorException(validatorResponse.getMessage());
        try{
            itemTypeRepository.save(itemType);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return null;
    }


    @Override
    public String deleteItemType(int itemTypeId) {
        ItemType itemType = itemTypeRepository.findById(itemTypeId).orElse(null);
        if(itemType == null){
            return "Item type doesn't exists";
        }
        itemTypeRepository.delete(itemTypeRepository.findById(itemTypeId).get());
        return "deleted";
    }

}
