package com.apmc.apmcSpringBoot.slotDetail;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;
@Repository
public interface SlotDetailRepository extends JpaRepository<SlotDetail, Integer> {


    @Query(value = "select sd.* from slot_details sd JOIN slots s ON sd.slot_id= s.slot_id where sd.agent_id=?1 AND s.slot_date>=?2",nativeQuery = true)
    List<SlotDetail> getSlotDetailByAgentId(int agentId, Date date);

    @Query(value = "select sd.* from slot_details sd JOIN slots s ON sd.slot_id= s.slot_id WHERE sd.user_id=?1 AND s.slot_date>=current_date()",nativeQuery = true)
     List<SlotDetail> getSlotDetailByUserId(int userId , Date date);
}
