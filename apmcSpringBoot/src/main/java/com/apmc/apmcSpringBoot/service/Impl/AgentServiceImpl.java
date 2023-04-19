package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.dao.AgentRepository;
import com.apmc.apmcSpringBoot.dao.ShopRepository;
import com.apmc.apmcSpringBoot.model.Agent;
import com.apmc.apmcSpringBoot.model.Shop;
import com.apmc.apmcSpringBoot.service.AgentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgentServiceImpl implements AgentService {

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private ShopRepository shopRepository;
    @Override
    @Transactional
    public List<Agent> getAllAgent() {
        return agentRepository.findAll();
    }

    @Override
    public Agent getAgentById(int agentId) {
        System.out.println("----------------------------+++++");
        Agent a = agentRepository.findById(agentId).get();
        System.out.println(a);
        System.out.println("---------------------------------");
        return agentRepository.findById(agentId).get();
    }

    @Override
    @Transactional
    public Agent addAgent(Agent agent) {
        Shop s = shopRepository.findById(agent.getShop().getShopId()).get();
        s.setOwner(agent.getUser());
        shopRepository.save(s);
        return agentRepository.save(agent);
    }

    @Override
    @Transactional
    public String deleteAgentById(int agentId) {
        agentRepository.delete(agentRepository.findById(agentId).get());
        return "deleted";
    }

    @Override
    public Agent editAgent(int agentId, Agent agent) {
        Agent a = getAgentById(agentId);
        a.setAgentName(agent.getAgentName());
        a.setContact(agent.getContact());
        a.setShop(agent.getShop());
        a.setUser(agent.getUser());
        a.setCompanyName(agent.getCompanyName());
        agentRepository.save(a);
        return a;
    }

    @Override
    public Agent getAgentByCompanyName(String companyName) {
        System.out.println("I'm here");
        Agent a = agentRepository.getAgentByCompanyName(companyName);
        return agentRepository.getAgentByCompanyName(companyName);
    }

}
