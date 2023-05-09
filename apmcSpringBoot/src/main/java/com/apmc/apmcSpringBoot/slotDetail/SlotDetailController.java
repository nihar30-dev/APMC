package com.apmc.apmcSpringBoot.slotDetail;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.List;

@RestController
@RequestMapping("/slotDetail")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SlotDetailController {

    @Autowired
    private SlotDetailService slotDetailService;

    @GetMapping("")
    public List<SlotDetail> getAllSlotDetail(){
        return slotDetailService.getAllSlotDetail();
    }


    @GetMapping("/{slotDetailId}")
    public SlotDetail getSlotDetailById(@PathVariable("slotDetailId") int slotDetailId){
        SlotDetail slotDetail = slotDetailService.getSlotDetailById(slotDetailId);
        if(slotDetail == null){
            throw new ResponseException("Not user details found for this Id");
        }
        return slotDetail;
    }


    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("")
    public Response addSlotDetail(@RequestBody SlotDetail slotDetail){
        return slotDetailService.addSlotDetail(slotDetail);
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @DeleteMapping("/{slotDetailId}")
    public String deleteSlotDetail(@PathVariable("slotDetailId") int slotDetailId){
        return slotDetailService.deleteSlotDetail(slotDetailId);
    }

    @GetMapping("/agent/{agentId}")
    public List<SlotDetail> getSlotDetailsByAgentId(@PathVariable int agentId) throws ParseException {



        return slotDetailService.getSlotDetailByAgentId(agentId);
    }

    @GetMapping("/user/{userId}")
    public List<SlotDetail> getSlotDetailByUserId(@PathVariable int userId) throws ParseException {
        return slotDetailService.getSlotDetailByUserId(userId);
    }
}
