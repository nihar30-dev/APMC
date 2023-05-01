package com.apmc.apmcSpringBoot.security.service;


import com.apmc.apmcSpringBoot.security.config.MyUserDetails;
import com.apmc.apmcSpringBoot.security.jwt.JwtUtils;
import com.apmc.apmcSpringBoot.security.payload.request.LoginRequest;
import com.apmc.apmcSpringBoot.security.payload.request.SignupRequest;
import com.apmc.apmcSpringBoot.security.payload.response.JwtResponse;
import com.apmc.apmcSpringBoot.user.User;
import com.apmc.apmcSpringBoot.user.UserRepository;
import com.apmc.apmcSpringBoot.user.role.Erole;
import com.apmc.apmcSpringBoot.user.role.Role;
import com.apmc.apmcSpringBoot.user.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public ResponseEntity<?> loginUtil(LoginRequest loginRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);


        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt ,  userDetails.getId(),
                userDetails.getUsername(),
                roles));
    }

    public Long signupUtil(SignupRequest signUpRequest){


        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                encoder.encode(signUpRequest.getPassword()), signUpRequest.getContact());

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(Erole.USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        System.out.println(roleRepository.findByName(Erole.ADMIN));
                        Role adminRole = roleRepository.findByName(Erole.ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "agent":
                        Role agentRole = roleRepository.findByName(Erole.AGENT)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(agentRole);

                        break;
                    case  "employee":
                        Role employeeRole = roleRepository.findByName(Erole.EMPLOYEE)
                                .orElseThrow(() -> new RuntimeException("Error : Role is not found."));
                        roles.add(employeeRole);
                    default:
                        Role userRole = roleRepository.findByName(Erole.USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return user.getId();
    }
}