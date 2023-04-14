package com.apmc.apmcSpringBoot.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name="agent")
public class Agent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="agent_id")
    private int agentId;

    @Column(name="company_name")
    private String companyName;

    @Column(name = "contact")
    private String contact;

    @Column(name="agent_name")
    private String agentName;

    @OneToOne()
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"username","password","contact","roles"})
    private User userId;

    @ManyToOne()
    @JoinColumn(name = "shop_id")
    private Shop shop;

    public Agent(){

    }

    public Agent(int agentId, String companyName, String contact, String agentName, User user, Shop shop) {
        this.agentId = agentId;
        this.companyName = companyName;
        this.contact = contact;
        this.agentName = agentName;
        this.userId = user;
        this.shop = shop;
    }

    public int getAgentId() {
        return agentId;
    }

    public void setAgentId(int agentId) {
        this.agentId = agentId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getAgentName() {
        return agentName;
    }

    public void setAgentName(String agentName) {
        this.agentName = agentName;
    }

    public User getUserId() {
        return userId;
    }

    public void setUserId(User userId) {
        this.userId = userId;
    }

    public Shop getShop() {
        return shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }
}
