package com.apmc.apmcSpringBoot.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreType;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import org.springframework.lang.NonNull;

@JsonIgnoreType
@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "shopId")
@Table(name="shops")
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="shop_id")
    private int shopId;

    @NonNull
    @Column(name="shop_no")
    private String shopNo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User user;

    public int getShopId() {
        return shopId;
    }

    public void setShopId(int shopId) {
        this.shopId = shopId;
    }

    @NonNull
    public String getShopNo() {
        return shopNo;
    }

    public void setShopNo(@NonNull String shopNo) {
        this.shopNo = shopNo;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Shop(int shopId, @NonNull String shopNo, User user) {
        this.shopId = shopId;
        this.shopNo = shopNo;
        this.user = user;
    }

    public Shop() {
    }

    @Override
    public String toString() {
        return "Shop{" +
                "shopId=" + shopId +
                ", shopNo='" + shopNo + '\'' +
                ", user=" + user +
                '}';
    }
}

