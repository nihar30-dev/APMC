package com.apmc.apmcSpringBoot.userDetail;

import com.apmc.apmcSpringBoot.userDetail.UserDetail;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserDetailService {
    public List<UserDetail> getAllUserDetail();

    public UserDetail getUserDetailById(int userDetailId);

    public ResponseEntity<UserDetail> addUserDetail(UserDetail userDetail);

    public String deleteUserDetail(int userDetailId);

    public UserDetail findByFullName(String fullName);
}
