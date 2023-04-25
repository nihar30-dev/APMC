package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dao.AgentRepository;
import com.apmc.apmcSpringBoot.dao.ShopRepository;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.AgentValidatorImpl;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.ItemValidatorImpl;
import com.apmc.apmcSpringBoot.model.Agent;
import com.apmc.apmcSpringBoot.model.ItemType;
import com.apmc.apmcSpringBoot.model.Shop;
import com.apmc.apmcSpringBoot.model.User;
import com.apmc.apmcSpringBoot.service.AgentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static java.nio.file.Files.setOwner;

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
    @Transactional
    public Agent getAgentById(int agentId) {
        Agent agent = null;
        try{
            agent = agentRepository.findById(agentId).get();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return agent;
    }

    @Override
    @Transactional
    public Response addAgent(Agent agent) {
        AgentValidatorImpl agentValidatorImpl = new AgentValidatorImpl(agentRepository, shopRepository);

//        @Autowired
//        AgentValidatorImpl agentValidatorImpl;

        ValidatorResponse validatorResponse = agentValidatorImpl.checkAgent(agent);

        if(!validatorResponse.isStatus()){
            throw new ValidatorException(validatorResponse.getMessage());
        }
        try{
            Shop s = shopRepository.findById(agent.getShop().getShopId()).get();
//            if(s.getOwner().getId()==null ){
                s.setOwner(agent.getUser());
                shopRepository.save(s);
                agentRepository.save(agent);
                return new Response(200, "ok", System.currentTimeMillis(), true);
//            }
//            else {
//                throw new ResponseException("shop is already taken");
//            }

        }catch (Exception e){
            return new Response(400,e.getMessage(),System.currentTimeMillis());
        }
    }

    @Override
    @Transactional
    public String deleteAgentById(int agentId) {
        Agent a = agentRepository.findById(agentId).get();
        Shop s = shopRepository.findById(a.getShop().getShopId()).get();

        s.setOwner(null);
//        User owner =  s.getOwner();
//        owner.setId(null);
        shopRepository.save(s);

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
    public Agent findByCompanyName(String companyName) {
        Agent agent = null;
        try{
            agent = agentRepository.findByCompanyName(companyName);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return agent;
    }

}