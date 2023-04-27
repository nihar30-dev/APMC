package com.apmc.apmcSpringBoot.dailyRate;

import com.apmc.apmcSpringBoot.item.Item;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "daily_rates")
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "rateId")
public class DailyRates {

    @Id
    @Column(name = "rate_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int rateId;

    @ManyToOne()
    @JoinColumn(name="item_id")
    @JsonIgnoreProperties({"dailyRates"})
    private Item item;

    @Column(name = "min_price")
    private int minPrice;

    @Column(name = "max_price")
    private int maxPrice;

    @Column(name = "avg_price")
    private int avgPrice;

    @Column(name = "quantity")
    private int quantity;

    @Temporal(TemporalType.DATE)
    @Column(name = "day")
    private Date day;

    public DailyRates() {
    }

    public DailyRates(int rateId, Item item, int minPrice, int maxPrice, int avgPrice, int quantity, Date day) {
        this.rateId = rateId;
        this.item = item;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.avgPrice = avgPrice;
        this.quantity = quantity;
        this.day = day;
    }

    public int getRateId() {
        return rateId;
    }

    public void setRateId(int rateId) {
        this.rateId = rateId;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public int getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(int minPrice) {
        this.minPrice = minPrice;
    }

    public int getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(int maxPrice) {
        this.maxPrice = maxPrice;
    }

    public int getAvgPrice() {
        return avgPrice;
    }

    public void setAvgPrice(int avgPrice) {
        this.avgPrice = avgPrice;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Date getDay() {
        return day;
    }

    public void setDay(Date day) {
        this.day = day;
    }
}