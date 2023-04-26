package com.apmc.apmcSpringBoot.dao.validator.validatorImpl;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dao.ShopRepository;
import com.apmc.apmcSpringBoot.dao.validator.ShopValidator;
import com.apmc.apmcSpringBoot.model.Item;
import com.apmc.apmcSpringBoot.model.ItemType;
import com.apmc.apmcSpringBoot.model.Shop;
import com.apmc.apmcSpringBoot.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ShopValidatorImpl implements ShopValidator{

    public ShopValidatorImpl(){
    }

    @Override
    public ValidatorResponse checkShop(Shop shop){
        String msg = "";
        ValidatorResponse vr1 = checkShopNo(shop.getShopNo());
        if (!vr1.isStatus()){
            msg += vr1.getMessage();
        }

        if(msg == ""){
            return new ValidatorResponse(true, "OK");
        } else{
            msg += " required";
            return new ValidatorResponse(false, msg);
        }
    }
    @Override
    public ValidatorResponse checkShopNo(String shopNo) {
        if (shopNo.length() > 0) {
            return new ValidatorResponse(true, "Ok");
        } else {
            return new ValidatorResponse(false, "Shop Name");
        }
    }



}
