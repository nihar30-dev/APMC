package com.apmc.apmcSpringBoot.userDetail;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailsRepository extends JpaRepository<UserDetail, Integer> {
    UserDetail findByFullName(String fullName);
}
