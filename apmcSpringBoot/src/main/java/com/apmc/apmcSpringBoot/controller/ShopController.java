package com.apmc.apmcSpringBoot.controller;


import com.apmc.apmcSpringBoot.model.Shop;
import com.apmc.apmcSpringBoot.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{agentId}")
    public ResponseEntity<Shop> getshopById(@PathVariable("agentId") int agentId){

        return ResponseEntity.ok(shopService.getAllShops().get(agentId));
    }

    @PostMapping("")
    public ResponseEntity<Shop> addShop(@RequestBody Shop shop){

       return null;

    }

}
