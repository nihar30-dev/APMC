package com.apmc.apmcSpringBoot.dao;

import com.apmc.apmcSpringBoot.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopRepository extends JpaRepository<Shop , Integer> {

}
