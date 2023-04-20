package com.apmc.apmcSpringBoot.controller;


import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import com.apmc.apmcSpringBoot.model.Shop;
import com.apmc.apmcSpringBoot.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;


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
    public ResponseEntity<Shop> getshopById(@PathVariable("shopId") int shopId) {
        return ResponseEntity.ok(shopService.getShopById(shopId).get());
    }

    @PostMapping("/add")
    public Response addShop(@RequestBody Shop shop) throws ResponseException {
        System.out.println("in controller ---------------------------------");
            return shopService.addShop(shop);
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
