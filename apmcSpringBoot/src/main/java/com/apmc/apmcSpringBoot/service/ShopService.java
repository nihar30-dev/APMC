package com.apmc.apmcSpringBoot.service;

import com.apmc.apmcSpringBoot.model.Shop;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface ShopService {

    public List<Shop> getAllShops();

    public Optional<Shop> getShopById(int shopId);

    public Shop addShop(Shop shop);

    public String deleteShop(int agentId);

    public Shop editShop(int shopId , Shop shop);


}
