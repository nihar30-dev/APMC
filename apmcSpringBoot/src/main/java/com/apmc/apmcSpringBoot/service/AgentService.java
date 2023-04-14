package com.apmc.apmcSpringBoot.service;

import com.apmc.apmcSpringBoot.model.Agent;
import org.hibernate.cfg.JPAIndexHolder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AgentService  {

    public List<Agent> getAllAgent();

    public Agent getAgentById(int agentId);

    public Agent addAgent(Agent agent);

    public String deleteAgentById(int agentId);
}
