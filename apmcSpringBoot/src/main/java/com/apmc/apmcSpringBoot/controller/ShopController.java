package com.apmc.apmcSpringBoot.controller;


import com.apmc.Exception.response.ResponseException;
import com.apmc.apmcSpringBoot.dto.ShopDTO;
import com.apmc.apmcSpringBoot.model.Shop;
import com.apmc.apmcSpringBoot.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/shop")
public class ShopController {

    @Autowired
    private ShopService shopService;

    @GetMapping("")
    public ResponseEntity<List<Shop>> getAllShops(){
        List<Shop> s = shopService.getAllShops();
            return ResponseEntity.ok(shopService.getAllShops());
    }

    @GetMapping("/{shopId}")
    public ResponseEntity<Shop> getshopById(@PathVariable("shopId") int shopId){
        return ResponseEntity.ok(shopService.getShopById(shopId).get());
    }

    @PostMapping("/add")
    public ResponseEntity<?> addShop(@RequestBody List<Shop> shops) throws ResponseException {
        System.out.println("in controller ---------------------------------");
        List<Shop> newShops = new ArrayList<>();
        for(int i=0;i<shops.size();i++){
            Shop shop = shops.get(i);
            shopService.addShop(shop);
            newShops.add(shops.get(i));
        }
        return ResponseEntity.ok(newShops);
    }

    @PutMapping("/{shopId}")
    public ResponseEntity<Shop> editShop(@PathVariable("shopId") int shopId , @RequestBody Shop shop){
         return ResponseEntity.ok(shopService.editShop(shopId , shop));
    }

    @DeleteMapping("/{shopId}")
    public String deleteShop(@PathVariable("shopId") int shopId){
        return shopService.deleteShop(shopId);
    }

}
