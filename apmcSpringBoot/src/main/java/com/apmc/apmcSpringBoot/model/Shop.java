package com.apmc.apmcSpringBoot.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import org.springframework.lang.NonNull;

import java.util.List;


@Entity
@Table(name="shops")
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="shop_id")
    private int shopId;

    @NonNull
    @Column(name="shop_no")
    private String shopNo;

    @ManyToOne()
    @JoinColumn(name="owner_id")
    @JsonIgnoreProperties({"username","password","contact","roles","shops","user","agent"})
    private User owner ;



    public Shop(int shopId, @NonNull String shopNo, User owner, List<Agent> agent) {
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

    @NonNull
    public String getShopNo() {
        return shopNo;
    }

    public void setShopNo(@NonNull String shopNo) {
        this.shopNo = shopNo;
    }

    public User getUser() {
        return owner;
    }

    public void setUser(User user) {
        this.owner = user;
    }


    public Shop() {
    }

}

