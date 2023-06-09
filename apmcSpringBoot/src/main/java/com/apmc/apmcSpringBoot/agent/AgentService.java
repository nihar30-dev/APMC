package com.apmc.apmcSpringBoot.agent;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.agent.Agent;

import java.util.List;

public interface AgentService  {

    public List<Agent> getAllAgent();

    public Agent getAgentById(int agentId);

    public Response addAgent(Agent agent);

    public String deleteAgentById(int agentId);

    Agent editAgent(int agentId, Agent agent);

    Agent findByCompanyName(String companyName);
}
