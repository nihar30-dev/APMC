package com.apmc.apmcSpringBoot.controller;

import com.apmc.apmcSpringBoot.service.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/agent")
public class AgentController {

    @Autowired
    private AgentService agentService;

    @GetMapping("/all")
    public ResponseEntity<?> getAllAgents(){
        return ResponseEntity.ok(agentService.getAllAgent());
    }
}
