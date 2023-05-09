package com.apmc.apmcSpringBoot.item;

import com.apmc.apmcSpringBoot.dailyRate.DailyRates;
import com.apmc.apmcSpringBoot.item.itemType.ItemType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

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

    @NotBlank(message = "name should be filled")
    @Column(name = "item_name")
    private String itemName;

    @ManyToOne()
    @JoinColumn(name="item_type_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private ItemType itemType;

    @OneToMany( mappedBy = "item",cascade = CascadeType.REMOVE)
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
