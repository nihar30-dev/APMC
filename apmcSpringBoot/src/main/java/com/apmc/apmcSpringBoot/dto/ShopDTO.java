package com.apmc.apmcSpringBoot.dto;


import com.apmc.apmcSpringBoot.model.User;
import jakarta.validation.constraints.NotNull;


public class ShopDTO {



    private int shopId;

    @NotNull(message = "shop Number should ")
    private String shopNo;

    @NotNull
    private User owner ;

    public ShopDTO() {
    }

    public ShopDTO(int shopId, String shopNo, User owner) {
        this.shopId = shopId;
        this.shopNo = shopNo;
        this.owner = owner;
    }

    public int getShopId() {
        return shopId;
    }

    public void setShopId(int shopId) {
        this.shopId = shopId;
    }

    public String getShopNo() {
        return shopNo;
    }

    public void setShopNo(String shopNo) {
        this.shopNo = shopNo;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
