package com.apmc.apmcSpringBoot.agent;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.security.payload.request.SignupRequest;
import com.apmc.apmcSpringBoot.security.service.AuthService;
import com.apmc.apmcSpringBoot.shop.ShopRepository;
import com.apmc.apmcSpringBoot.agent.validation.AgentValidatorImpl;
import com.apmc.apmcSpringBoot.shop.Shop;
import com.apmc.apmcSpringBoot.user.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class AgentServiceImpl implements AgentService {

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private AuthService authSerive;
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
    @Transactional()
    public Response addAgent(Agent agent) {

        int n = agentRepository.companyNameExist(agent.getCompanyName());

        if(n==0){

            System.out.println(agent.getAgentName());
            String userName = agent.getAgentName() + Long.toString(System.currentTimeMillis()).substring(9, 13);
            Set<String> role= new HashSet<>();
            role.add("agent");
            SignupRequest signUpRequest = new SignupRequest(userName, userName, agent.getContact(),role);
            Long userId =  authSerive.signupUtil(signUpRequest);
            agent.setUser(new User(userId));

            AgentValidatorImpl agentValidatorImpl = new AgentValidatorImpl(agentRepository, shopRepository);
            ValidatorResponse validatorResponse = agentValidatorImpl.checkAgent(agent);
            if(!validatorResponse.isStatus()){
                throw new ValidatorException(validatorResponse.getMessage());
            }

            try{
                System.out.println(userId);
                agent.setUser(new User(userId));
                Shop s = shopRepository.findById(agent.getShop().getShopId()).get();
                s.setOwner(agent.getUser());
                shopRepository.save(s);
                agentRepository.save(agent);
                return new Response(200, "ok", System.currentTimeMillis(), true);
            }catch (Exception e){
                return new Response(400,e.getMessage(),System.currentTimeMillis());
            }
        }
        else{
            throw new ResponseException("Company already exist");
        }
    }

    @Override
    @Transactional
    public ResponseEntity<?> deleteAgentById(int agentId) {
        Agent a = agentRepository.findById(agentId).get();
        Shop s = shopRepository.findById(a.getShop().getShopId()).get();

        s.setOwner(null);
//        User owner =  s.getOwner();
//        owner.setId(null);
        shopRepository.save(s);

        agentRepository.delete(agentRepository.findById(agentId).get());
        return ResponseEntity.ok(agentId);
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
