package com.apmc.apmcSpringBoot.dao.validator;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.model.Agent;
import jakarta.validation.Valid;

public interface AgentValidator {

    public ValidatorResponse checkAgent(Agent agent);

    public ValidatorResponse checkNames(String companyName, String agentName);

    public ValidatorResponse checkNumber(String phoneNo);



}
