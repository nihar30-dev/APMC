package com.apmc.apmcSpringBoot.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.aspectj.bridge.Message;
import org.hibernate.annotations.NotFound;
import org.springframework.lang.NonNull;

@Entity
@Table(name="agent")
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "agentId")
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
    @JsonIgnoreProperties({"username","password","contact","roles","agent","shops","hibernateLazyInitializer", "handler"})
    private User user;

    @ManyToOne()
    @JoinColumn(name = "shop_id")
    @JsonIgnoreProperties({"owner","hibernateLazyInitializer", "handler"})
    private Shop shop;

    public Agent(){

    }

    public Agent(int agentId, String companyName, String contact, String agentName, User user, Shop shop) {
        this.agentId = agentId;
        this.companyName = companyName;
        this.contact = contact;
        this.agentName = agentName;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Shop getShop() {
        return shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }
}
