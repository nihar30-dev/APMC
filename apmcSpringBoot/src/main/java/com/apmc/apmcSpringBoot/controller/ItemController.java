package com.apmc.apmcSpringBoot.controller;

import com.apmc.apmcSpringBoot.Exception.BusinessException;
import com.apmc.apmcSpringBoot.Exception.ControllerException;
import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import com.apmc.apmcSpringBoot.model.Item;
import com.apmc.apmcSpringBoot.model.ItemType;
import com.apmc.apmcSpringBoot.service.ItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/item")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("")
    public ResponseEntity<?> getAllItem() throws ResponseException {
        return ResponseEntity.ok(itemService.getAllItems());
    }

    @GetMapping("/{itemId}")
    public ResponseEntity<?> getItemById(@PathVariable int itemId) throws ResponseException {
        Item item = null;
        item = itemService.getItemById(itemId);
        if (item == null){
            throw new ResponseException();
        }
        return ResponseEntity.ok(item);    }

    @GetMapping("/itemType/{itemTypeId}")
    public ResponseEntity<List<Item>> getItemByTypeId(@PathVariable int itemTypeId) throws ResponseException {
        List<Item> items = itemService.getItemByItemType(itemTypeId);
        if (items == null){
            throw new ResponseException("No items in this id present");
        }
        return ResponseEntity.ok(items);
    }

    @PostMapping("")
    public Response addItem(@RequestBody Item item) throws ResponseException{
        return itemService.addItem(item);

    }

    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable int itemId) throws ResponseException {
        return ResponseEntity.ok(itemService.deleteItem(itemId));
    }
}
