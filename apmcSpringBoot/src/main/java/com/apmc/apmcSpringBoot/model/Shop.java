package com.apmc.apmcSpringBoot.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import org.springframework.lang.NonNull;

import java.util.List;


@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "shopId")
@Table(name="shops")
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
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
    @JsonIgnoreProperties({"username","password","contact","roles","shops","user"})
    private User owner ;

//    @OneToMany()
//    @JoinColumn(name="shop_id")
//    private List<Agent> agent;

    public Shop(int shopId, @NonNull String shopNo, User user, List<Agent> agent) {
        this.shopId = shopId;
        this.shopNo = shopNo;
        this.owner = user;
//        this.agent = agent;
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

