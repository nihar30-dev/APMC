package com.apmc.apmcSpringBoot.dao;

import com.apmc.apmcSpringBoot.model.Role;
import com.apmc.apmcSpringBoot.model.Erole;

import org.aspectj.apache.bcel.classfile.Module;
import org.hibernate.metamodel.model.convert.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Optional<Role> findByName(Erole name);
}
