package com.apmc.apmcSpringBoot.dto;

import com.apmc.apmcSpringBoot.model.ItemType;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ItemDTO {

    private int itemId;
    @NotNull(message = "Item Name is required")
    @NotBlank(message ="item name could not be blank")
    private String itemName;

    @NotNull(message = "Item type should me mentioned")
    private ItemType itemType;

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
}
