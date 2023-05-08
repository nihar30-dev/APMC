package com.apmc.apmcSpringBoot.security.config;

import com.apmc.apmcSpringBoot.user.UserRepository;
import com.apmc.apmcSpringBoot.user.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private  UserRepository userRepository;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        try{
        Optional<User> user = userRepository.getUserByUsername(username);

        if(user.get() == null){
            throw new UsernameNotFoundException("User not found");
        }
        else{
            return MyUserDetails.build(user.get());
        }}catch (Exception e){
            e.printStackTrace();
            return null;
        }

    }
}
