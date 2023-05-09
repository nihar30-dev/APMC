package com.apmc.apmcSpringBoot.userDetail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDetailsRepository extends JpaRepository<UserDetail, Integer> {
    UserDetail findByFullName(String fullName);

    public boolean existsUserDetailByUserId(Long id);

    @Query(value = "SELECT * FROM user_details ud WHERE ud.user_id=?1", nativeQuery = true)
    public UserDetail findByUserId(Long id);
}
