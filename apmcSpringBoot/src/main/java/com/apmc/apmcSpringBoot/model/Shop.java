package com.apmc.apmcSpringBoot.model;


import jakarta.persistence.*;
import org.springframework.lang.NonNull;

@Entity
@Table(name="shops")
public class Shop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="shopId")
    private int shopId;

    @NonNull
    @Column(name="shop_no")
    private int shopNo;




}
