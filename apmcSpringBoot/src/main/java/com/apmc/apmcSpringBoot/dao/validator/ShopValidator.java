package com.apmc.apmcSpringBoot.dao.validator;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.model.Shop;

public interface ShopValidator {

    public ValidatorResponse checkShop(Shop shop);
    public ValidatorResponse checkShopNo(String shopNo);



}
