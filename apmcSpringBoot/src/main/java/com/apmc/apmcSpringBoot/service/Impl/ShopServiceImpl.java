package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.dao.ShopRepository;
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


}

