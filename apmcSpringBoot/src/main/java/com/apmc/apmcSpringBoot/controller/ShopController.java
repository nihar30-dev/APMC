package com.apmc.apmcSpringBoot.controller;


import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import com.apmc.apmcSpringBoot.model.Shop;
import com.apmc.apmcSpringBoot.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public Shop getshopById(@PathVariable("shopId") int shopId) {
        Shop shop = shopService.getShopById(shopId);
        if (shop == null){
            throw new ResponseException("No shops found for this ShopId");
        }
        return shop;
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
    public String deleteShop(@PathVariable int shopId){
        return shopService.deleteShop(shopId);
    }

}
