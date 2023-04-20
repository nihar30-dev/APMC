package com.apmc.apmcSpringBoot.dao;

import com.apmc.apmcSpringBoot.model.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShopRepository extends JpaRepository<Shop , Integer> {

    @Query(value = "SELECT * FROM shops  where owner_id =?1 ",nativeQuery = true)
    public List<Shop> existByOwnerId(Long ownerId);

}
