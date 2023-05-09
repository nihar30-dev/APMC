package com.apmc.apmcSpringBoot.item;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
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
    public Item getItemById(@PathVariable int itemId){
        Item item = null;
        item = itemService.getItemById(itemId);
        if (item == null){
            throw new ResponseException("No item for this Id");
        }
        return item;    }

    @GetMapping("/itemType/{itemTypeId}")
    public ResponseEntity<List<Item>> getItemByTypeId(@PathVariable int itemTypeId){
        List<Item> items = itemService.findByItemTypeId(itemTypeId);
//        if (items.size() == 0){
//            throw new ResponseException("No items in this ItemType Id");
//        }
        return ResponseEntity.ok(items);
    }
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("")
    public Response addItem(@RequestBody Item item) throws ResponseException{
        return itemService.addItem(item);

    }
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @DeleteMapping("/{itemId}")
    public ResponseEntity<?> deleteItem(@PathVariable int itemId) throws ResponseException {
        return ResponseEntity.ok(itemService.deleteItem(itemId));
    }
}
