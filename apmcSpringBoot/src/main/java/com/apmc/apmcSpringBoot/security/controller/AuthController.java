
package com.apmc.apmcSpringBoot.security.controller;

import com.apmc.apmcSpringBoot.security.config.GoogleAuthentication;
import com.apmc.apmcSpringBoot.security.service.AuthService;
import com.apmc.apmcSpringBoot.user.role.RoleRepository;
import com.apmc.apmcSpringBoot.user.UserRepository;
import com.apmc.apmcSpringBoot.security.jwt.JwtUtils;

import com.apmc.apmcSpringBoot.user.User;
import com.apmc.apmcSpringBoot.security.payload.request.LoginRequest;
import com.apmc.apmcSpringBoot.security.payload.request.SignupRequest;

import com.apmc.apmcSpringBoot.security.payload.response.MessageResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import java.security.GeneralSecurityException;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {


    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    AuthService authService;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;
    // Login authentication
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser( @RequestBody LoginRequest loginRequest) {
        return authService.loginUtil(loginRequest);
    }
    @PostMapping("/google")
    public ResponseEntity<?> googleSignup(@RequestParam String idToken) throws GeneralSecurityException, IOException {
        GoogleAuthentication googleAuthentication = new GoogleAuthentication();
        String email = googleAuthentication.isVerified(idToken);
        if(email!=null){
            String username = "#google$"+email;
            boolean userExists = userRepository.existsByUsername(username);
            if(userExists){
                User user = userRepository.getUserByUsername(username).get();
                LoginRequest loginRequest = new LoginRequest(username,username);
                return authenticateUser(loginRequest);
            }
            else{
                SignupRequest signupRequest = new SignupRequest(username,username,"9999999999");
                if(authService.signupUtil(signupRequest) != null){
                    return authenticateUser(new LoginRequest(signupRequest.getUsername(), signupRequest.getPassword()));
                }
            }
        }
        return  ResponseEntity.ok(email);
    }
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser( @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }
        return ResponseEntity.ok(authService.signupUtil(signUpRequest));
    }
    @GetMapping("/normal")
    public ResponseEntity<String> normalUser() {
        return ResponseEntity.ok("This is normal user");
    }

}
