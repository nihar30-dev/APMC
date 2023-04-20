package com.apmc.apmcSpringBoot.dao.validator;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.model.Agent;
import com.apmc.apmcSpringBoot.model.Shop;
import com.apmc.apmcSpringBoot.model.User;
import jakarta.validation.Valid;

public interface AgentValidator {

    public ValidatorResponse checkAgent(Agent agent);

    public ValidatorResponse checkNames(String companyName, String agentName);

    public ValidatorResponse checkNumber(String phoneNo);

    public ValidatorResponse checkUserId(User user);

    public ValidatorResponse checkShopId(Shop shop);

    public ValidatorResponse checkIfOwnerHasAShop(Agent agent);

}
