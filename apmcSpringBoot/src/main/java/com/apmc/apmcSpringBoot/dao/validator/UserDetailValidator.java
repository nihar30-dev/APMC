package com.apmc.apmcSpringBoot.dao.validator;

import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.model.User;
import com.apmc.apmcSpringBoot.model.UserDetail;

public interface UserDetailValidator {
    public ValidatorResponse checkUserDetail(UserDetail userDetail);

    public ValidatorResponse checkNames(String fullName, String district, String taluka, String village, String crops);

    public ValidatorResponse checkUserId(User user);


}
