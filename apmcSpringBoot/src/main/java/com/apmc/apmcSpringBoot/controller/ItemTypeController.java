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

    @GetMapping("/all")
    public ResponseEntity<?> getAllItemTypes(){
        System.out.println("in controller ======================");
        return ResponseEntity.ok(itemTypeService.getAllItemTypes());
    }

    @GetMapping("/ItemTypeById/{item_Type_Id}")
    public ResponseEntity<?> getAllItemTypes(@PathVariable int item_Type_Id){
        System.out.println("in controller ======================");
        return ResponseEntity.ok(itemTypeService.getItemTypesById(item_Type_Id));
    }

    @PostMapping("/addItemType")
    public ResponseEntity<?> addItemTypes(@RequestBody ItemType itemType){
        return ResponseEntity.ok(itemTypeService.addItemType(itemType));
    }

    @DeleteMapping("/deleteItemType/{item_Type_Id}")
    public ResponseEntity<?> deleteItemType(@PathVariable int item_Type_Id){
        return ResponseEntity.ok(itemTypeService.deleteItemType(item_Type_Id));
    }
}

