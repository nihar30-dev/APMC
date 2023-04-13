package com.apmc.apmcSpringBoot.security.config;

import com.apmc.apmcSpringBoot.dao.UserRepository;
import com.apmc.apmcSpringBoot.model.User;
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
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        try{
        Optional<User> user = userRepository.getUserByUsername(username);

        if(user==null){
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
