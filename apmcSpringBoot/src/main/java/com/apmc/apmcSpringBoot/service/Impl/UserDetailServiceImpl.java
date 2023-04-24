package com.apmc.apmcSpringBoot.service.Impl;

import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.dao.UserDetailsRepository;
import com.apmc.apmcSpringBoot.dao.validator.validatorImpl.UserDetailValidatorImpl;
import com.apmc.apmcSpringBoot.model.UserDetail;
import com.apmc.apmcSpringBoot.service.UserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserDetailServiceImpl implements UserDetailService {


    @Autowired
    private UserDetailsRepository userDetailsRepository;

    @Override
    public List<UserDetail> getAllUserDetail() {
        return userDetailsRepository.findAll();
    }

    @Override
    public UserDetail getUserDetailById(int userDetailId) {
        UserDetail userDetail = null;
        try{
            userDetail = userDetailsRepository.findById(userDetailId).get();
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return userDetail;
    }

    @Override
    public ResponseEntity<UserDetail> addUserDetail(UserDetail userDetail) {
        UserDetailValidatorImpl userDetailValidator = new UserDetailValidatorImpl(userDetailsRepository);

        ValidatorResponse validatorResponse = userDetailValidator.checkUserDetail(userDetail);

        if(!validatorResponse.isStatus())
            throw new ValidatorException(validatorResponse.getMessage());
        try{
            userDetailsRepository.save(userDetail);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return null;
    }

    @Override
    public String deleteUserDetail(int userDetailId) {
        userDetailsRepository.delete(userDetailsRepository.findById(userDetailId).get());
        return "deleted";
    }

    @Override
    public UserDetail findByFullName(String fullName) {
        return userDetailsRepository.findByFullName(fullName);
    }
}
