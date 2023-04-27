package com.apmc.apmcSpringBoot.shop;


import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/shop")
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
public class ShopController {

    @Autowired
    private ShopService shopService;

    @GetMapping("")
    public ResponseEntity<List<Shop>> getAllShops(){
        List<Shop> s = shopService.getAllShops();
            return ResponseEntity.ok(shopService.getAllShops());
    }

    @GetMapping("/{shopId}")
    public Shop getShopById(@PathVariable("shopId") int shopId) {
        Shop shop = shopService.getShopById(shopId);
        if (shop == null){
            throw new ResponseException("No shops found for this ShopId");
        }
        return shop;
    }

    @GetMapping("/owner/{ownerId}")
    public List<Shop> getShopById(@PathVariable("ownerId") Long OwnerId){
        List<Shop> shops = shopService.findByOwnerId(OwnerId);
        return ResponseEntity.ok(shopService.findByOwnerId(OwnerId)).getBody();
    }
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("")
    public Response addShop(@RequestBody Shop shop) throws ResponseException {
            return shopService.addShop(shop);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PutMapping("/{shopId}")
    public ResponseEntity<Shop> editShop(@PathVariable("shopId") int shopId , @RequestBody Shop shop){
         return ResponseEntity.ok(shopService.editShop(shopId , shop));
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @DeleteMapping("/{shopId}")
    public String deleteShop(@PathVariable int shopId){
        return shopService.deleteShop(shopId);
    }

}
