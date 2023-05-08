package com.apmc.apmcSpringBoot.controller;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import com.apmc.apmcSpringBoot.model.SlotDetail;
import com.apmc.apmcSpringBoot.service.SlotDetailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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


    @PostMapping("")
    public Response addSlotDetail(@RequestBody SlotDetail slotDetail){
        return slotDetailService.addSlotDetail(slotDetail);
    }

    @DeleteMapping("/{slotDetailId}")
    public String deleteSlotDetail(@PathVariable("slotDetailId") int slotDetailId){
        return slotDetailService.deleteSlotDetail(slotDetailId);
    }

}
