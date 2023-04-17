package com.apmc.apmcSpringBoot.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="items")
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "itemId")
public class Item {


    @Id
    @Column(name = "item_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;

    @Column(name = "item_name")
    private String itemName;

    @ManyToOne()
    @JoinColumn(name="item_type_id")
    @JsonIgnoreProperties({"itemTypeName", "hibernateLazyInitializer", "handler"})
    private ItemType itemType;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "item")
    @JsonIgnore
    private List<DailyRates> dailyRates;

    public Item() {
    }

    public Item(int itemId, String itemName, ItemType itemType) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemType = itemType;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public ItemType getItemType() {
        return itemType;
    }

    public void setItemType(ItemType itemType) {
        this.itemType = itemType;
    }

    public List<DailyRates> getDailyRates() {
        return dailyRates;
    }

    public void setDailyRates(List<DailyRates> dailyRates) {
        this.dailyRates = dailyRates;
    }
}
