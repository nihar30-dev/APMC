package com.apmc.apmcSpringBoot.userDetail;

import com.apmc.apmcSpringBoot.Exception.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @GetMapping("/{userId}")
    public UserDetail getAgentById(@PathVariable("userId") Long userId){
        UserDetail userDetail = userDetailService.getUserDetailByUserId(userId);
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
