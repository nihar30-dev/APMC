package com.apmc.apmcSpringBoot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "slot_details")
public class SlotDetail {
    @Id
    @Column(name = "slot_detail_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_id")
    @JsonIgnore
    private Agent agent;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "slot_id")
    @JsonIgnore
    private Slot slot;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "slot_date")
    private Date slotDate;

    public SlotDetail() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Agent getAgent() {
        return agent;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }


    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Date getSlotDate() {
        return slotDate;
    }

    public void setSlotDate(Date slotDate) {
        this.slotDate = slotDate;
    }

    public Slot getSlot() {
        return slot;
    }

    public void setSlot(Slot slot) {
        this.slot = slot;
    }

    public SlotDetail(User user, Agent agent, Slot slot, int quantity, Date slotDate) {
        this.user = user;
        this.agent = agent;
        this.slot = slot;
        this.quantity = quantity;
        this.slotDate = slotDate;
    }
}
