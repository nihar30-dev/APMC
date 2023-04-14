package com.apmc.apmcSpringBoot.dao;

import com.apmc.apmcSpringBoot.model.Agent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AgentRepository extends JpaRepository<Agent,Integer> {



    @Query("SELECT a FROM Agent a WHERE a.companyName=?1")
    Agent getAgentByCompanyName(String companyName);
}
