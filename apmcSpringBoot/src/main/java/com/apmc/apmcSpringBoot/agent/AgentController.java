package com.apmc.apmcSpringBoot.agent;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agent")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AgentController {

    @Autowired
    private AgentService agentService;



    @GetMapping("")
    public ResponseEntity<List<Agent>> getAllAgents(){
        System.out.println(agentService.getAllAgent());
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
        Agent agent  = agentService.findByCompanyName(companyName);
        if(agent == null){
            throw new ResponseException("Not agent found for this Company Name");
        }
        return agent;
    }


    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("")
    public Response addAgent(@RequestBody Agent agent){
        agent.setAgentId(0);
        return agentService.addAgent(agent);
    }
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PutMapping("/{agentId}")
    public ResponseEntity<Agent> editAgent(@PathVariable("agentId") int agentId , @RequestBody Agent agent){
          return ResponseEntity.ok(agentService.editAgent(agentId,agent));
    }
    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @DeleteMapping("/{agentId}")
    public ResponseEntity<?> deleteAgent(@PathVariable("agentId") int agentId){
        return ResponseEntity.ok(agentService.deleteAgentById(agentId));
    }


}
