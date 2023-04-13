package com.apmc.apmcSpringBoot.service;

import com.apmc.apmcSpringBoot.dao.ShopRepository;
import com.apmc.apmcSpringBoot.model.Shop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ShopService {

    public List<Shop> geAllShops();

    public Shop getShopById(int shopId);


}
