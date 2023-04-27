package com.apmc.apmcSpringBoot.item.itemType;

import com.apmc.apmcSpringBoot.Exception.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/itemType")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ItemTypeController {

    @Autowired
    private ItemTypeService itemTypeService;

    @GetMapping("")
    public ResponseEntity<?> getAllItemTypes() {
        return ResponseEntity.ok(itemTypeService.getAllItemTypes());
    }

    @GetMapping("/{item_Type_Id}")
    public ItemType GetItemTypeById(@PathVariable int item_Type_Id){
        ItemType itemType = itemTypeService.getItemTypesById(item_Type_Id);
        if (itemType == null) {
            throw new ResponseException("No ItemType found for this Id");
        }
        return itemType;
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @DeleteMapping("/{item_Type_Id}")
    public ResponseEntity<?> deleteItemType(@PathVariable int item_Type_Id){
        return ResponseEntity.ok(itemTypeService.deleteItemType(item_Type_Id));
    }
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("")
    public ResponseEntity<?> addItemTypes(@RequestBody ItemType itemType){
        return itemTypeService.addItemType(itemType);
    }
}

