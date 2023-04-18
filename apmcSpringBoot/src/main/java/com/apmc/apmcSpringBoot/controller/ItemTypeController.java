package com.apmc.apmcSpringBoot.controller;

import com.apmc.apmcSpringBoot.dto.converter.ItemTypeConverter;
import com.apmc.apmcSpringBoot.dto.ItemTypeDTO;
import com.apmc.apmcSpringBoot.model.ItemType;
import com.apmc.apmcSpringBoot.service.ItemTypeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/itemType")
public class ItemTypeController {

    @Autowired
    private ItemTypeService itemTypeService;

    @Autowired
    private ItemTypeConverter itemTypeConverter;

    @GetMapping("")
    public ResponseEntity<?> getAllItemTypes(){
        return ResponseEntity.ok(itemTypeService.getAllItemTypes());
    }

    @GetMapping("/{item_Type_Id}")
    public ResponseEntity<?> GetItemTypeById(@PathVariable int item_Type_Id){
        return ResponseEntity.ok(itemTypeService.getItemTypesById(item_Type_Id));
    }

    @PostMapping("")
    public ResponseEntity<?> addItemTypes(@Valid @RequestBody ItemTypeDTO itemTypeDTO){

        ItemType itemType = itemTypeConverter.DtoToEntity(itemTypeDTO);
        itemType = itemTypeService.addItemType(itemType);
        return ResponseEntity.ok(itemType);
    }

    @DeleteMapping("/{item_Type_Id}")
    public ResponseEntity<?> deleteItemType(@PathVariable int item_Type_Id){
        return ResponseEntity.ok(itemTypeService.deleteItemType(item_Type_Id));
    }
}

