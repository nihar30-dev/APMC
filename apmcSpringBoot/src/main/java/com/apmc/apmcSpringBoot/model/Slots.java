package com.apmc.apmcSpringBoot.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "slots")
public class Slots {

    @Id
    @Column(name = "slot_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int slotId;
    @ManyToOne
    @JoinColumn(name = "item_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler","itemType"})
    private Item item;
    @Column(name = "total_quantity")
    private int totalQuantity;
    @Column(name = "booked_quantity")
    private int bookedQuantity;
    @Temporal(TemporalType.DATE)
    @Column(name = "slot_date")
    private Date slotDate;

//    @OneToMany( mappedBy = "slot", cascade = CascadeType.REMOVE)
//    private List<SlotDetails> slotDetails;
    public Slots(){}

    public Slots(int slotId, Item item, int totalQuantity, int bookedQuantity, Date slotDate){
        this.slotId = slotId;
        this.item = item;
        this.totalQuantity = totalQuantity;
        this.bookedQuantity = bookedQuantity;
        this.slotDate = slotDate;
    }
    public int getSlotId() {
        return slotId;
    }

    public void setSlotId(int slotId) {
        this.slotId = slotId;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    public int getTotalQuantity() {
        return totalQuantity;
    }

    public void setTotalQuantity(int totalQuantity) {
        this.totalQuantity = totalQuantity;
    }

    public int getBookedQuantity() {
        return bookedQuantity;
    }

    public void setBookedQuantity(int bookedQuantity) {
        this.bookedQuantity = bookedQuantity;
    }

    public Date getSlotDate() {
        return slotDate;
    }

    public void setSlotDate(Date slotDate) {
        this.slotDate = slotDate;
    }
}


