package com.apmc.apmcSpringBoot.shop;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.shop.Shop;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ShopService {

    public List<Shop> getAllShops();

    public Shop getShopById(int shopId);

    public List<Shop> findByOwnerId(Long ownerId);

    public Response addShop(Shop shop);

    public String deleteShop(int agentId);

    public Shop editShop(int shopId , Shop shop);


}
