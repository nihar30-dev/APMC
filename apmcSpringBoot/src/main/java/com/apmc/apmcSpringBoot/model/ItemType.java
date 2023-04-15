package com.apmc.apmcSpringBoot.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="item_type")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "itemTypeId")
public class ItemType {

    @Id
    @Column(name = "item_type_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemTypeId;

    @Column(name = "item_type_name")
    private String itemTypeName;

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "itemType")
//    @JsonIgnoreProperties({"itemName"})
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
