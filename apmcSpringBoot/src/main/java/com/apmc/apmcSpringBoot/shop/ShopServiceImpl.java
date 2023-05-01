package com.apmc.apmcSpringBoot.shop;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.shop.validation.ShopValidatorImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

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

        }
        return shop;

    }
    @Override
    @Transactional
    public List<Shop> findByOwnerId(Long ownerId){
        return this.shopRepository.findByOwnerId(ownerId);
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
//            throw new ValidatorException(validatorResponse.getMessage());
            throw new ResponseException("Shop already exist");
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
            return "error";
        }


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

