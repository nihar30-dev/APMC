package com.apmc.apmcSpringBoot.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name="user_details")
public class UserDetail {

    @Id
    @Column(name = "user_detail_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"username","password","contact","roles","agent","shops","hibernateLazyInitializer", "handler","userDetail"})
    private User user;

    @Column(name = "full_name")
    private String fullName;
    @Column(name = "district")
    private String district;

    @Column(name = "taluka")
    private String taluka;
    @Column(name = "village")
    private String village;

    @Column(name = "crops")
    private String crops;

    public UserDetail(){

    }

    public UserDetail(User user, String fullName, String district, String taluka, String village, String crops) {
        this.user = user;
        this.fullName = fullName;
        this.district = district;
        this.taluka = taluka;
        this.village = village;
        this.crops = crops;
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

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getTaluka() {
        return taluka;
    }

    public void setTaluka(String taluka) {
        this.taluka = taluka;
    }

    public String getVillage() {
        return village;
    }

    public void setVillage(String village) {
        this.village = village;
    }

    public String getCrops() {
        return crops;
    }

    public void setCrops(String crops) {
        this.crops = crops;
    }

    @Override
    public String toString() {
        return "UserDetail{" +
                "id=" + id +
                ", user=" + user +
                ", fullName='" + fullName + '\'' +
                ", district='" + district + '\'' +
                ", taluka='" + taluka + '\'' +
                ", village='" + village + '\'' +
                ", crops='" + crops + '\'' +
                '}';
    }
}
