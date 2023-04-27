package com.apmc.apmcSpringBoot.item.itemType;

import com.apmc.apmcSpringBoot.item.Item;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="item_type")
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "itemTypeId")
public class ItemType {

    @Id
    @Column(name = "item_type_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemTypeId;

    @Column(name = "item_type_name")
    private String itemTypeName;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "itemType")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler","itemType"})
    private List<Item> items;

    public ItemType(){

    }

    public ItemType(int itemTypeId, String itemTypeName) {
        this.itemTypeId = itemTypeId;
        this.itemTypeName = itemTypeName;
    }

    public int getItemTypeId() {
        return itemTypeId;
    }

    public void setItemTypeId(int itemTypeId) {
        this.itemTypeId = itemTypeId;
    }

    public String getItemTypeName() {
        return itemTypeName;
    }

    public void setItemTypeName(String itemTypeName) {
        this.itemTypeName = itemTypeName;
    }
}
