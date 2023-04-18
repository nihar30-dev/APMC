package com.apmc.apmcSpringBoot.controller;

import com.apmc.apmcSpringBoot.Exception.ResponseException;
import com.apmc.apmcSpringBoot.dto.ItemDTO;
import com.apmc.apmcSpringBoot.dto.converter.ItemConverter;
import com.apmc.apmcSpringBoot.model.Item;
import com.apmc.apmcSpringBoot.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private ItemConverter itemConverter;

    @GetMapping("")
    public ResponseEntity<?> getAllItem() throws ResponseException {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<?> getItemById(@PathVariable int itemId) throws ResponseException {
        return ResponseEntity.ok(itemService.getItemById(itemId));
    }

    @GetMapping("/itemType/{itemTypeId}")
    public ResponseEntity<List<Item>> getItemByTypeId(@PathVariable int itemTypeId) throws ResponseException {
        return ResponseEntity.ok(itemService.getItemByItemType(itemTypeId));
    }

    @PostMapping("")
    public ResponseEntity<?> addItem(@Valid @RequestBody ItemDTO itemDTO){

        Item item = itemConverter.DtoToEntity(itemDTO);
        item = itemService.addItem(item);
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable int itemId) throws ResponseException {
        return ResponseEntity.ok(itemService.deleteItem(itemId));
    }
}
