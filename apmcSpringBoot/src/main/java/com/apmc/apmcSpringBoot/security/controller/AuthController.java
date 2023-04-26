
package com.apmc.apmcSpringBoot.security.controller;

import com.apmc.apmcSpringBoot.security.config.GoogleAuthentication;
import com.apmc.apmcSpringBoot.security.config.MyUserDetails;
import com.apmc.apmcSpringBoot.dao.RoleRepository;
import com.apmc.apmcSpringBoot.dao.UserRepository;
import com.apmc.apmcSpringBoot.security.jwt.JwtUtils;
import com.apmc.apmcSpringBoot.model.Role;
import com.apmc.apmcSpringBoot.model.User;
import com.apmc.apmcSpringBoot.security.payload.request.LoginRequest;
import com.apmc.apmcSpringBoot.security.payload.request.SignupRequest;
import com.apmc.apmcSpringBoot.security.payload.response.JwtResponse;
import com.apmc.apmcSpringBoot.security.payload.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import com.apmc.apmcSpringBoot.model.Erole;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

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
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    // Login authentication
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser( @RequestBody LoginRequest loginRequest) {
        return loginUtil(loginRequest);
    }


    @PostMapping("/google")
    public ResponseEntity<?> googleSignup(@RequestHeader String idToken) throws GeneralSecurityException, IOException {
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
                if(signupUtil(signupRequest) != null){
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



        return signupUtil(signUpRequest);


    }




    @GetMapping("/normal")
    public ResponseEntity<String> normalUser() {
        return ResponseEntity.ok("This is normal user");
    }


    //util method for both username-pasword and google login
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

    public ResponseEntity<?> signupUtil(SignupRequest signUpRequest){


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

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }


}
