package com.apmc.apmcSpringBoot.model;

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

    @Column(name = "contat")
    private String contact;







}
