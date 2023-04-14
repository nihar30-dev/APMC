package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.dao.AgentRepository;
import com.apmc.apmcSpringBoot.model.Agent;
import com.apmc.apmcSpringBoot.service.AgentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgentServiceImpl implements AgentService {

    @Autowired
    private AgentRepository agentRepository;
    @Override
    @Transactional
    public List<Agent> getAllAgent() {
        return agentRepository.findAll();
    }

    @Override
    @Transactional
    public Agent getAgentById(int agentId) {
        return agentRepository.findById(agentId).get();
    }

    @Override
    @Transactional
    public Agent addAgent(Agent agent) {
        return agentRepository.save(agent);
    }

    @Override
    @Transactional
    public String deleteAgentById(int agentId) {
        agentRepository.delete(agentRepository.findById(agentId).get());
        return "deleted";
    }
}
