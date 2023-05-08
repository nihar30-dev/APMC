package com.apmc.apmcSpringBoot.controller;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import com.apmc.apmcSpringBoot.dao.validator.UserDetailValidator;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.UserDetailValidatorImpl;
import com.apmc.apmcSpringBoot.model.Agent;
import com.apmc.apmcSpringBoot.model.User;
import com.apmc.apmcSpringBoot.model.UserDetail;
import com.apmc.apmcSpringBoot.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/userDetail")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UserDetailController {

    @Autowired
    private UserDetailService userDetailService;

    @GetMapping("")
    public ResponseEntity<List<UserDetail>> getAllUserDetail(){
        return ResponseEntity.ok(userDetailService.getAllUserDetail());
    }

    @GetMapping("/{userDetailId}")
    public UserDetail getAgentById(@PathVariable("userDetailId") int userDetailId){
        UserDetail userDetail = userDetailService.getUserDetailById(userDetailId);
        if(userDetail == null){
            throw new ResponseException("Not user details found for this Id");
        }
        return userDetail;
    }

    @GetMapping("/name/{fullName}")
    public UserDetail getUserDetailByFullName(@PathVariable("fullName") String fullName){
        UserDetail userDetail = userDetailService.findByFullName(fullName);
        if(userDetail == null){
            throw new ResponseException("Not user details found for this Name");
        }
        return userDetail;
    }


    @PostMapping("")
    public ResponseEntity<?> addUserDetail(@RequestBody UserDetail userDetail){
        return userDetailService.addUserDetail(userDetail);
    }

    @DeleteMapping("/{userDetailId}")
    public String deleteAgent(@PathVariable("userDetailId") int userDetailId){
        return userDetailService.deleteUserDetail(userDetailId);
    }


}
