package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dao.ShopRepository;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.ItemValidatorImpl;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.ShopValidatorImpl;
import com.apmc.apmcSpringBoot.model.Shop;
import com.apmc.apmcSpringBoot.service.ShopService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShopServiceImpl implements ShopService {

    @Autowired
    private ShopRepository shopRepository;
    @Override
    @Transactional
    public List<Shop> getAllShops() {
        return shopRepository.findAll();
    }

    @Override
    @Transactional
    public Shop getShopById(int shopId) {
        Shop shop = null;
        try{
            shop = shopRepository.findById(shopId).get();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return shop;

    }

    @Override
    @Transactional
    public Response addShop(Shop shop) {
        ShopValidatorImpl shopValidator = new ShopValidatorImpl();
        ValidatorResponse validatorResponse = shopValidator.checkShop(shop);

        if(!validatorResponse.isStatus()){
            throw new ValidatorException(validatorResponse.getMessage());
        }
        try {
            shopRepository.save(shop);
            return new Response(200, "Ok", System.currentTimeMillis(), true);
        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new ValidatorException(validatorResponse.getMessage());
        }
    }

    @Override
    @Transactional
    public String deleteShop(int shopId) {

        Shop shop = shopRepository.findById(shopId).get();
        shopRepository.deleteById(shopId);
        try{
            shop.setOwner(null);
            shopRepository.deleteById(shopId);
            return "deleted";
        }catch (Exception e){
            System.out.println(e.getMessage());
            return "error";
        }

//        shopRepository.deleteById(shopId);
//        return "not working";

    }

    @Override
    @Transactional
    public Shop editShop(int shopId, Shop shop) {
        Shop s = shopRepository.findById(shopId).get();
        s.setShopNo(shop.getShopNo());
        s.setOwner(shop.getOwner());
        s.setOwner(shop.getOwner());
        return s;
    }
}

