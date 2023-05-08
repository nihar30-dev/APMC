package com.apmc.apmcSpringBoot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "password", "contact", "userDetail", "shops", "roles", "agent"})
    private User user;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agent_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "user", "contact", "shop", "slotDetail"})
    private Agent agent;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "slot_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Slots slot;

    @Column(name = "quantity")
    private int quantity;

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


    public Slots getSlot() {
        return slot;
    }

    public void setSlot(Slots slot) {
        this.slot = slot;
    }

    public SlotDetail(User user, Agent agent, Slots slot, int quantity) {
        this.user = user;
        this.agent = agent;
        this.slot = slot;
        this.quantity = quantity;

    }
}
