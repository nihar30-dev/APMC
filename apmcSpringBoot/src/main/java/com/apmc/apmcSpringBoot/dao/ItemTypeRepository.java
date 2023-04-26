package com.apmc.apmcSpringBoot.dao;

import com.apmc.apmcSpringBoot.model.ItemType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemTypeRepository extends JpaRepository<ItemType, Integer> {

}
