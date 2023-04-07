package com.apmc.apmcSpringBoot.model;


import jakarta.persistence.*;

//Authentication model for ROLES
@Entity
@Table(name="role_id")
public class Role {
    @Id
    @Column(name = "role_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    public String getName() {

        return name;
    }

    public Integer getId() {
        return id;
    }
}
