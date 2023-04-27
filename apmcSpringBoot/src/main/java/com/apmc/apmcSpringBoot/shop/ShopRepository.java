package com.apmc.apmcSpringBoot.shop;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepository extends JpaRepository<Shop , Integer> {

//    @Query(value = "SELECT * FROM shops  where owner_id =?1 ",nativeQuery = true)
    public List<Shop> findByOwnerId(Long ownerId);

}
