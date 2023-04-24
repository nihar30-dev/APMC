package com.apmc.apmcSpringBoot.dao;

import com.apmc.apmcSpringBoot.model.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<UserDetail, Integer> {
    UserDetail findByFullName(String fullName);
}
