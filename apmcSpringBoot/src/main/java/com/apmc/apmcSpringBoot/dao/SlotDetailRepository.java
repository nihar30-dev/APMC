package com.apmc.apmcSpringBoot.dao;

import com.apmc.apmcSpringBoot.model.SlotDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface SlotDetailRepository extends JpaRepository<SlotDetail, Integer> {
    public List<SlotDetail> findBySlotDate(Date date);
}
