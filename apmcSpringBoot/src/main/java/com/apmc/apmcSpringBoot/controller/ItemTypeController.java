package com.apmc.apmcSpringBoot.controller;

import com.apmc.apmcSpringBoot.model.ItemType;
import com.apmc.apmcSpringBoot.service.AgentService;
import com.apmc.apmcSpringBoot.service.ItemTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/itemType")
public class ItemTypeController {

    @Autowired
    private ItemTypeService itemTypeService;

    @GetMapping("")
    public ResponseEntity<?> getAllItemTypes(){
        return ResponseEntity.ok(itemTypeService.getAllItemTypes());
    }

    @GetMapping("/{item_Type_Id}")
    public ResponseEntity<?> GetItemTypeById(@PathVariable int item_Type_Id){
        return ResponseEntity.ok(itemTypeService.getItemTypesById(item_Type_Id));
    }

    @PostMapping("")
    public ResponseEntity<?> addItemTypes(@RequestBody ItemType itemType){
        return ResponseEntity.ok(itemTypeService.addItemType(itemType));
    }

    @DeleteMapping("/{item_Type_Id}")
    public ResponseEntity<?> deleteItemType(@PathVariable int item_Type_Id){
        return ResponseEntity.ok(itemTypeService.deleteItemType(item_Type_Id));
    }
}

