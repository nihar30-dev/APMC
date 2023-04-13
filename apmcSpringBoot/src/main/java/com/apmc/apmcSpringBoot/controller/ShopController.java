package com.apmc.apmcSpringBoot.controller;


import com.apmc.apmcSpringBoot.model.Shop;
import com.apmc.apmcSpringBoot.service.ShopService;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/all")
public class ShopController {

    @Autowired
    private ShopService shopService;

    @GetMapping("/shops")
    public ResponseEntity<List<Shop>> getAllShops(){
        Shop s = shopService.getShopById(1);
        return ResponseEntity.ok(shopService.geAllShops());
    }

    @GetMapping("/shop")
    public Shop getshopById(){
        Shop s = shopService.getShopById(2);
        System.out.println(shopService.getShopById(2));
        return shopService.getShopById(2);
    }

    @GetMapping("/all")
    public String allAccess() {
        return "Public Content.";
    }
}
