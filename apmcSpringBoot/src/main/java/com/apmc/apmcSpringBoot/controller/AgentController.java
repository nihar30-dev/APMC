package com.apmc.apmcSpringBoot.controller;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import com.apmc.apmcSpringBoot.model.Agent;
import com.apmc.apmcSpringBoot.service.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agent")
public class AgentController {

    @Autowired
    private AgentService agentService;

    @GetMapping("")
    public ResponseEntity<List<Agent>> getAllAgents(){
        return ResponseEntity.ok(agentService.getAllAgent());
    }

    @GetMapping("/{agentId}")
    public Agent getAgentById(@PathVariable("agentId") int agentId){
        Agent agent = agentService.getAgentById(agentId);
        if(agent == null){
            throw new ResponseException("Not agent found for this Id");
        }
        return agent;
    }

    @GetMapping("/name/{companyName}")
    public Agent getAgentByCompanyName(@PathVariable("companyName") String companyName){
        Agent agent  = agentService.getAgentByCompanyName(companyName);
        if(agent == null){
            throw new ResponseException("Not agent found for this Company Name");
        }
        return agent;
    }

    @PostMapping("")
    public Response addAgent(@RequestBody Agent agent){
        return agentService.addAgent(agent);
    }

    @PutMapping("/{agentId}")
    public ResponseEntity<Agent> editAgent(@PathVariable("agentId") int agentId , @RequestBody Agent agent){
          return ResponseEntity.ok(agentService.editAgent(agentId,agent));
    }

    @DeleteMapping("/{agentId}")
    public String deleteAgent(@PathVariable("agentId") int agentId){
        return agentService.deleteAgentById(agentId);
    }


}
