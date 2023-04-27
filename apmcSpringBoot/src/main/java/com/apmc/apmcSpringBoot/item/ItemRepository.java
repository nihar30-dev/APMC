package com.apmc.apmcSpringBoot.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer>{

//    @Query(value = "SELECT i.* FROM items as i inner JOIN item_type as it on it.item_type_id = i.item_type_id where i.item_type_id = ?1",nativeQuery = true)
     List<Item> findByItemTypeItemTypeId(int itemTypeId);
}
