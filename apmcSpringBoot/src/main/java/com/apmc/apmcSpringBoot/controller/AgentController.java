package com.apmc.apmcSpringBoot.controller;

import com.apmc.apmcSpringBoot.model.Agent;
import com.apmc.apmcSpringBoot.model.Shop;
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
    public ResponseEntity<Agent> getAgentById(@PathVariable("agentId") int agentId){

        return ResponseEntity.ok(agentService.getAgentById(agentId));
    }

    @GetMapping("/name/{companyName}")
    public Agent getAgentByCompanyName(@PathVariable("companyName") String companyName){
        Agent a  = agentService.getAgentByCompanyName(companyName);
          return agentService.getAgentByCompanyName(companyName);
    }

    @PostMapping("")
    public ResponseEntity<Agent> addAgent(@RequestBody Agent agent){
        return ResponseEntity.ok(agentService.addAgent(agent));
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
