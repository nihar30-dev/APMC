package com.apmc.apmcSpringBoot.controller;

import com.apmc.apmcSpringBoot.model.Item;
import com.apmc.apmcSpringBoot.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("")
    public ResponseEntity<?> getAllItem(){
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<?> getItemById(@PathVariable int itemId){
        System.out.println("in controller ======================");
        return ResponseEntity.ok(itemService.getItemById(itemId));
    }

    @GetMapping("/itemType/{itemTypeId}")
    public ResponseEntity<List<Item>> getItemByTypeId(@PathVariable int itemTypeId){
        return ResponseEntity.ok(itemService.getItemByItemType(itemTypeId));
    }

    @PostMapping("")
    public ResponseEntity<?> addItem(@RequestBody Item item){
        return ResponseEntity.ok(itemService.addItem(item));
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable int itemId){
        return ResponseEntity.ok(itemService.deleteItem(itemId));
    }
}
