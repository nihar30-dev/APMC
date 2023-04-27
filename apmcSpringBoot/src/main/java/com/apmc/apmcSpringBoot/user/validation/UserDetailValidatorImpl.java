package com.apmc.apmcSpringBoot.user.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.userDetail.UserDetailsRepository;
import com.apmc.apmcSpringBoot.user.User;
import com.apmc.apmcSpringBoot.userDetail.UserDetail;
import org.springframework.stereotype.Component;

@Component
public class UserDetailValidatorImpl implements UserDetailValidator {

    private UserDetailsRepository userDetailsRepository;

    public UserDetailValidatorImpl(UserDetailsRepository userDetailsRepository){
        this.userDetailsRepository = userDetailsRepository;
    }



    @Override
    public ValidatorResponse checkUserDetail(UserDetail userDetail) {
        String msg = "";
        ValidatorResponse vr1;

        vr1 = checkNames(userDetail.getFullName(), userDetail.getDistrict(), userDetail.getTaluka(), userDetail.getVillage(), userDetail.getCrops());
        if (!vr1.isStatus()){
            msg += vr1.getMessage();
        }

        vr1 = checkUserId(userDetail.getUser());
        if (!vr1.isStatus()){
            msg += vr1.getMessage() + ", ";
        }

        if(msg == ""){
            return new ValidatorResponse(true, "OK");
        } else{
            msg += " required";
            return new ValidatorResponse(false, msg);
        }
    }

    @Override
    public ValidatorResponse checkNames(String fullName, String district, String taluka, String village, String crops) {
        if (fullName.length() <= 0 ) {
            return new ValidatorResponse(false, "Full Name");
        }else if(district.length() <= 0 ){
            return new ValidatorResponse(false, "District");
        } else if (taluka.length() <= 0) {
            return new ValidatorResponse(false, "Taluka");
        } else if (village.length() <= 0) {
            return new ValidatorResponse(false, "Village");
        }else if( crops.length() <= 0 ){
            return new ValidatorResponse(false, "Crops");
        }

        return new ValidatorResponse(true, "Ok");
    }

    @Override
    public ValidatorResponse checkUserId(User user) {
        if(user == null){
            return new ValidatorResponse(false, "User ");
        }
        try{
            Long a = user.getId();
            if(a == 0){
                return new ValidatorResponse(false, "User Id ");
            }
        }catch (Exception e){
            return new ValidatorResponse(false, "User Id ");
        }
        return new ValidatorResponse(true, "Ok");
    }
}
