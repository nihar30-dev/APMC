package com.apmc.apmcSpringBoot.controller;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import com.apmc.apmcSpringBoot.model.Slots;
import com.apmc.apmcSpringBoot.service.SlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/slots")
public class SlotsController {

    @Autowired
    private SlotService slotService;

    @GetMapping("")
    public ResponseEntity<?> getAllSlots() throws ResponseException
    {
        return ResponseEntity.ok(slotService.getAllSlots());
    }

    @GetMapping("/date")
    public List<Slots> findBySlotDate(@RequestParam String day) throws ParseException{
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dateFormat.parse(day);
        List<Slots> slots = slotService.findBySlotDate(date);
        if(slots.size() == 0){
            throw new ResponseException("No slots found for this date");
        }
         return slots;
    }

    @GetMapping("/{slotId}")
    public Slots findBySlotId(@PathVariable int slotId){
        Slots slot = slotService.findBySlotId(slotId);
        if(slot == null){
            throw new ResponseException("No slot found for this id");
        }
        return slot;
    }

//    @GetMapping("/item/{itemId}")
//    public Slots slotExistForDateAndItem(@RequestParam String day, @PathVariable int itemId) throws ParseException {
//        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//        Date date = dateFormat.parse(day);
//        return slotService.slotExistForDateAndItem(date, itemId);
//    }

    @PostMapping("")
    public Response addItemSlot(@RequestParam String day, @RequestBody Slots slot )throws ParseException, ResponseException{
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dateFormat.parse(day);
        return slotService.addItemSlot(date, slot);
    }

    @DeleteMapping("/{slotId}")
    public ResponseEntity<?> deleteSlot(@PathVariable int slotId ) throws ResponseException{
        return ResponseEntity.ok(slotService.deleteSlot(slotId));
    }
}
