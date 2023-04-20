package com.apmc.apmcSpringBoot.model;

import com.apmc.apmcSpringBoot.service.AgentService;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import org.hibernate.engine.internal.Cascade;

import java.util.List;
import java.util.Set;

//@JsonIgnoreType

@Entity
@Table(name="users")
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "id")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name="password")
    private String password;

    @Column(name="contact")
    private String contact;

    @ManyToMany()
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name="role_id")
    )
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Set<Role> roles;


    @OneToOne(cascade = CascadeType.ALL, mappedBy = "owner")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Shop shops;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Agent agent;

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public User(){
        System.out.printf("inside User Constructor==========================");
    }

    public User(Long id, String username, String password, String contact, Set<Role> roles, Shop shops, Agent agent) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.contact = contact;
        this.roles = roles;
        this.shops = shops;
        this.agent = agent;
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String username, String password, String contact) {
        this.username = username;
        this.password = password;
        this.contact = contact;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public Shop getShops() {
        return shops;
    }

    public void setShops(Shop shops) {
        this.shops = shops;
    }

    public Agent getAgent() {
        return agent;
    }

    public void setAgent(Agent agent) {
        this.agent = agent;
    }
}
