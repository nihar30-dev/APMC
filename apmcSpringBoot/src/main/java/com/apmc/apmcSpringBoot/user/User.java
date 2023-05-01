package com.apmc.apmcSpringBoot.user;

import com.apmc.apmcSpringBoot.agent.Agent;
import com.apmc.apmcSpringBoot.userDetail.UserDetail;
import com.apmc.apmcSpringBoot.shop.Shop;
import com.apmc.apmcSpringBoot.slotDetail.SlotDetail;
import com.apmc.apmcSpringBoot.user.role.Role;
import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;

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


    @OneToOne( mappedBy = "owner")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Shop shops;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY,cascade = CascadeType.REMOVE)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler",})
    private Agent agent;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler","user"})
    private UserDetail userDetail;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<SlotDetail> slotDetail;
    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }

    public User(){

    }
    public User(Long id) {
        this.id = id;
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

    public UserDetail getUserDetail() {
        return userDetail;
    }

    public void setUserDetail(UserDetail userDetail) {
        this.userDetail = userDetail;
    }

    public List<SlotDetail> getSlotDetail() {
        return slotDetail;
    }

    public void setSlotDetail(List<SlotDetail> slotDetail) {
        this.slotDetail = slotDetail;
    }
}
