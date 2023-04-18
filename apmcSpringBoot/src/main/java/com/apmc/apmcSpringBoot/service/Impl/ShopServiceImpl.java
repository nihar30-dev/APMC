package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.dao.ShopRepository;
import com.apmc.apmcSpringBoot.dto.ShopDTO;
import com.apmc.apmcSpringBoot.model.Shop;
import com.apmc.apmcSpringBoot.service.ShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShopServiceImpl implements ShopService {

    @Autowired
    private ShopRepository shopRepository;
    @Override
    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    @Override
    public Optional<Shop> getShopById(int shopId) {
        return shopRepository.findById(shopId);
    }

    @Override
    public Shop addShop(Shop shop) {

        return shopRepository.save(shop);

    }

    @Override
    public String deleteShop(int shopId) {
        shopRepository.delete(getShopById(shopId).get());
        return "deleted";
    }

    @Override
    public Shop editShop(int shopId, Shop shop) {
        Shop s = shopRepository.findById(shopId).get();
        s.setShopNo(shop.getShopNo());
        s.setOwner(shop.getOwner());
        s.setOwner(shop.getOwner());
        return s;
    }
}

