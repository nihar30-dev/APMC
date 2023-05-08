package com.apmc.apmcSpringBoot.shop.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.shop.Shop;

public interface ShopValidator {

    public ValidatorResponse checkShop(Shop shop);
    public ValidatorResponse checkShopNo(String shopNo);



}
