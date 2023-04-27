package com.apmc.apmcSpringBoot.user.role;


import com.apmc.apmcSpringBoot.user.role.Erole;
import jakarta.persistence.*;

//Authentication model for ROLES
@Entity
@Table(name="roles")
public class Role {
    @Id
    @Column(name = "role_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private Erole name;

    public Erole getName() {
        return name;
    }

    public Role(){
        System.out.println("Hii I am initialised ");
    }

    public Integer getId() {
        return id;
    }
}
