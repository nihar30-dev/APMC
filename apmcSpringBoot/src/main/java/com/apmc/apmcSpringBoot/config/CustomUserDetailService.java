package com.apmc.apmcSpringBoot.config;

import com.apmc.apmcSpringBoot.dao.UserRepository;
import com.apmc.apmcSpringBoot.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    private  UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.getUserByUserName(username);
        if(user==null){
            throw new UsernameNotFoundException("User not found");
        }
        else{
            return MyUserDetails.buid(user);
        }

    }
}
