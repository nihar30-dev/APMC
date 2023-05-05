package com.apmc.apmcSpringBoot.notice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Integer> {

    @Query(value = "SELECT * FROM notification where current_date()>=start_date and current_date()<=end_date", nativeQuery = true)
    List<Notice> getNoticeBeforeEndDate();
}

