package com.apmc.apmcSpringBoot.userDetail;

import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.user.validation.UserDetailValidatorImpl;
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

        UserDetail userDetail = userDetailsRepository.findById(userDetailId).orElse(null);
        if(userDetail == null){
            return "User detail doesn't exists";
        }
        userDetailsRepository.delete(userDetailsRepository.findById(userDetailId).get());
        return "deleted";
    }

    @Override
    public UserDetail findByFullName(String fullName) {
        UserDetail userDetail = userDetailsRepository.findByFullName(fullName);
        if(userDetail == null) {
            System.out.println("User Details Doesn't Exist");
        }
        return userDetail;
    }

}
