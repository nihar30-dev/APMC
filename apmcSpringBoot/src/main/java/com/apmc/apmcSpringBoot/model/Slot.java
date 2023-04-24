package com.apmc.apmcSpringBoot.model;

import jakarta.persistence.*;

@Entity
@Table(name = "slots")
public class Slot {
    @Id
    @Column(name = "slot_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
