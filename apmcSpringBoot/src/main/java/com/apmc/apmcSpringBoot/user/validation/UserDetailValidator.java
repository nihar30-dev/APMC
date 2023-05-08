package com.apmc.apmcSpringBoot.user.validation;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.user.User;
import com.apmc.apmcSpringBoot.userDetail.UserDetail;

public interface UserDetailValidator {
    public ValidatorResponse checkUserDetail(UserDetail userDetail);

    public ValidatorResponse checkNames(String fullName, String district, String taluka, String village, String crops);

    public ValidatorResponse checkUserId(User user);


}
