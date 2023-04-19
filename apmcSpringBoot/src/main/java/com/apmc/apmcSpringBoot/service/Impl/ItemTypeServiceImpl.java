package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.Exception.BusinessException;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dao.ItemTypeRepository;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.ItemTypeValidatorImpl;
import com.apmc.apmcSpringBoot.model.ItemType;
import com.apmc.apmcSpringBoot.service.ItemTypeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.MethodArgumentNotValidException;

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
    public ResponseEntity<ItemType> addItemType(ItemType itemType) throws ValidatorException {
//        String temp = checkItem(itemType);
//        if(temp == ""){
//            return ResponseEntity.ok(itemTypeRepository.save(itemType));
//        }else{
//            return ResponseEntity.ok(temp);
//        }

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

//        if(itemType.getItemTypeName() == "" || itemType.getItemTypeName() == null){
//            throw new BusinessException("601", "Item type name is a required field");
//        }
//        try{
//            return ResponseEntity.ok(itemTypeRepository.save(itemType));
//        }catch (IllegalArgumentException e){
//            throw new BusinessException("602", "Item tpye object is null");
//        }catch (Exception e){
//            throw new BusinessException("603", "something went wrong in service layer");
//        }
    }


    @Override
    public String deleteItemType(int ItemTypeId) {
        itemTypeRepository.delete(itemTypeRepository.findById(ItemTypeId).get());
        return "deleted";
    }

//    private String checkItem(ItemType itemType) throws MethodArgumentNotValidException{
//        String msg = "";
//        try{
//            if(itemType.getItemTypeName() == "" || itemType.getItemTypeName() == null){
//                throw new MethodArgumentNotValidException();
//            }
//        }catch(MethodArgumentNotValidException e){
//
//        }
//        return msg;
//    }
}
