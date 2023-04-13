package com.apmc.apmcSpringBoot.model;

import jakarta.persistence.*;
import org.springframework.lang.NonNull;

@Entity
@Table(name="agent")
public class Agent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="agent_id")
    private int agentId;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shop_id")
    private Shop shop;

    @NonNull
    @Column(name="company_name")
    private String companyName;

    @NonNull
    @Column(name = "contat")
    private String contact;

    @NonNull
    @Column(name = "agent_name")
    private String agentName;

    @NonNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public Agent() {
    }

    public Agent(int agentId, @NonNull Shop shop, @NonNull String companyName, @NonNull String contact, @NonNull String agentName, @NonNull User user) {
        this.agentId = agentId;
        this.shop = shop;
        this.companyName = companyName;
        this.contact = contact;
        this.agentName = agentName;
        this.user = user;
    }

    public int getAgentId() {
        return agentId;
    }

    public void setAgentId(int agentId) {
        this.agentId = agentId;
    }

    @NonNull
    public Shop getShop() {
        return shop;
    }

    public void setShop(@NonNull Shop shop) {
        this.shop = shop;
    }

    @NonNull
    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(@NonNull String companyName) {
        this.companyName = companyName;
    }

    @NonNull
    public String getContact() {
        return contact;
    }

    public void setContact(@NonNull String contact) {
        this.contact = contact;
    }

    @NonNull
    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(@NonNull String agentName) {
        this.agentName = agentName;
    }

    @NonNull
    public User getUser() {
        return user;
    }

    public void setUser(@NonNull User user) {
        this.user = user;
    }
}