package com.apmc.apmcSpringBoot.dao.validator.validatorImpl;

import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dao.AgentRepository;
import com.apmc.apmcSpringBoot.dao.ShopRepository;
import com.apmc.apmcSpringBoot.dao.validator.AgentValidator;
import com.apmc.apmcSpringBoot.model.Agent;
import com.apmc.apmcSpringBoot.model.Shop;
import com.apmc.apmcSpringBoot.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class AgentValidatorImpl implements AgentValidator {


    AgentRepository agentRepository;


    ShopRepository shopRepository;

    public AgentValidatorImpl(AgentRepository agentRepository, ShopRepository shopRepository){
        this.agentRepository = agentRepository;
        this.shopRepository = shopRepository;
    }


    @Override
    public ValidatorResponse checkAgent(Agent agent) {
        String msg = "";
        ValidatorResponse vr1;

        vr1 = checkNames(agent.getAgentName(), agent.getCompanyName());
        if (!vr1.isStatus()){
            msg += vr1.getMessage();
        }

        vr1 = checkNumber(agent.getContact());
        if (!vr1.isStatus()){
            msg += vr1.getMessage()+ ", ";
        }

        vr1 = checkUserId(agent.getUser());
        if (!vr1.isStatus()){
            msg += vr1.getMessage() + ", ";
        }

        vr1 = checkShopId(agent.getShop());
        if (!vr1.isStatus()){
            msg += vr1.getMessage() + ", ";
        }

        vr1 = checkIfOwnerHasAShop(agent);
        if (!vr1.isStatus()){
            msg += vr1.getMessage() + ", ";
        }
        vr1 = shopAlreadyTaken(agent);
        if (!vr1.isStatus()){
            msg += vr1.getMessage() + ", ";
        }


        if(msg == ""){
            return new ValidatorResponse(true, "OK");
        } else{
            msg += " required";
            return new ValidatorResponse(false, msg);
        }    }

    @Override
    public ValidatorResponse checkNames(String companyName, String agentName) {
        if (companyName.length() > 0 && agentName.length()> 0) {
            return new ValidatorResponse(true, "Ok");
        }else {
            return new ValidatorResponse(false, "Agent Name and Comapny Name");
        }
    }


    @Override
    public ValidatorResponse checkNumber(String phoneNo) {
        String regexStr = "^[789]{1}[0-9]{9}$";
        Pattern pattern = Pattern.compile(regexStr);
        Matcher matcher = pattern.matcher(phoneNo);
        if (matcher.matches() && phoneNo.length() == 10) {
            return new ValidatorResponse(true, "Ok");
        }else {
            return new ValidatorResponse(false, "Phone ");
        }
    }

    @Override
    public ValidatorResponse checkUserId(User user) {
        if(user == null){
            return new ValidatorResponse(false, "User ");
        }
        try{
            Long a = user.getId();
            if(a == 0){
                return new ValidatorResponse(false, "User Id ");
            }
        }catch (Exception e){
            return new ValidatorResponse(false, "User Id ");
        }
        return new ValidatorResponse(true, "Ok");
    }

    @Override
    public ValidatorResponse checkShopId(Shop shop) {
        if(shop == null){
            return new ValidatorResponse(false, "Shop");
        }
        try{
            int a = shop.getShopId();
            if(a == 0){
                return new ValidatorResponse(false, "Shop Id");
            }
        }catch (Exception e){
            return new ValidatorResponse(false, "Shop Id");
        }
        return new ValidatorResponse(true, "Ok");
    }

    @Override
    public ValidatorResponse checkIfOwnerHasAShop(Agent agent) {

        List<Agent> agents = agentRepository.existByOwnerId(agent.getUser().getId());
        if (agents.size() != 0) {
            return new ValidatorResponse(false, "Could not add, shop already has a owner ");
        }

        return new ValidatorResponse(true, "ok");
    }

    public ValidatorResponse shopAlreadyTaken(Agent agent){
        Shop s = shopRepository.findById(agent.getShop().getShopId()).get();
        if(s.getOwner().getId()==null ){
            return new ValidatorResponse(true,"ok");
        }
        else {
            return new ValidatorResponse(false,"Shop is already taken");
        }
    }
}
