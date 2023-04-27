package com.apmc.apmcSpringBoot.shop;

import com.apmc.apmcSpringBoot.user.User;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import org.springframework.lang.NonNull;
//import org.codehaus.jackson.annotate.JsonIgnore;


@Entity
@Table(name="shops")
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "shopId")
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="shop_id")
    private int shopId;

    @NonNull
    @Column(name="shop_no")
    private String shopNo;

    @OneToOne()
    @JoinColumn(name="owner_id")
    @JsonIgnoreProperties({"username","password","contact","roles","shops","user","agent"})
    private User owner;


    public Shop(int shopId, @NonNull String shopNo, User owner) {
        this.shopId = shopId;
        this.shopNo = shopNo;
        this.owner = owner;
    }


    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
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

    public Shop() {
    }

}

