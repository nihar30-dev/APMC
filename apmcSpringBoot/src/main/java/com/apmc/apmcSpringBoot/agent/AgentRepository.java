package com.apmc.apmcSpringBoot.agent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgentRepository extends JpaRepository<Agent,Integer> {

//    @Query("SELECT a FROM Agent a WHERE a.companyName=?1")
    Agent findByCompanyName(String companyName);

    @Query(value = "SELECT * FROM agent  where user_id =?1 ",nativeQuery = true)
    public List<Agent> existByOwnerId(Long ownerId);

    @Query(value = "select count(*) from agent where company_name=?1", nativeQuery = true)
    public int companyNameExist(String companyName);



}
