package com.apmc.apmcSpringBoot.agent.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.agent.Agent;
import com.apmc.apmcSpringBoot.shop.Shop;
import com.apmc.apmcSpringBoot.user.User;


public interface AgentValidator {


    public ValidatorResponse checkAgent(Agent agent);

    public ValidatorResponse checkNames(String companyName, String agentName);

    public ValidatorResponse checkNumber(String phoneNo);

    public ValidatorResponse checkUserId(User user);

    public ValidatorResponse checkShopId(Shop shop);

    public ValidatorResponse checkIfOwnerHasAShop(Agent agent);

}
