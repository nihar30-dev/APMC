
package com.apmc.apmcSpringBoot.controller;

import com.apmc.apmcSpringBoot.config.MyUserDetails;
import com.apmc.apmcSpringBoot.dao.RoleRepository;
import com.apmc.apmcSpringBoot.dao.UserRepository;
import com.apmc.apmcSpringBoot.jwt.JwtUtils;
import com.apmc.apmcSpringBoot.payload.request.LoginRequest;
import com.apmc.apmcSpringBoot.payload.response.JwtResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;

//import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import java.util.List;
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

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser( @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt));
    }


//    @PostMapping("/signup")
//    public ResponseEntity<?> authenticateUser(@RequestBody )




    @GetMapping("/normal")
    public ResponseEntity<String> normalUser() {
        return ResponseEntity.ok("This is normal user");
    }
//
//
//    @GetMapping("/admin")
//    public ResponseEntity<String> adminUser() {
//        return ResponseEntity.ok("This is Admin user");
//    }
//
//    @GetMapping("/public")
//    public ResponseEntity<String> publicUser() {
//        return ResponseEntity.ok("This is Public user");
//    }


}
