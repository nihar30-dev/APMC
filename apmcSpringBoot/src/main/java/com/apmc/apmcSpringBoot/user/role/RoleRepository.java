package com.apmc.apmcSpringBoot.user.role;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {



    Optional<Role> findByName(Erole name);
}
