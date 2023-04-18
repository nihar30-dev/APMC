package com.apmc.apmcSpringBoot.controller;


import com.apmc.apmcSpringBoot.Exception.ResponseException;
import com.apmc.apmcSpringBoot.model.DailyRates;
import com.apmc.apmcSpringBoot.service.DailyRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/dailyRates")
public class DailyRatesController {

    @Autowired
    private DailyRateService dailyRateService;

    @GetMapping("")
    public ResponseEntity<?> getDailyRatesByDate(@RequestParam String day) throws ParseException, ResponseException {
        System.out.println(day);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dateFormat.parse(day);
        return ResponseEntity.ok(dailyRateService.getAllItemsByDate(date));
    }

    @GetMapping("/{rateId}")
    public ResponseEntity<DailyRates> getDailyRatesById(@PathVariable int rateId) throws ResponseException {
        return ResponseEntity.ok(dailyRateService.getDailyRatesById(rateId));
    }


    @PostMapping("")
    public ResponseEntity<DailyRates> addDailyRates(@RequestParam String day,@RequestBody DailyRates dailyRates) throws ParseException, ResponseException {
        System.out.println(day);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dateFormat.parse(day);
        System.out.println(date);
        System.out.println("--------------------------------------------______");
        dailyRates.setDay(date);
        System.out.println(dailyRates.getDay());

        return ResponseEntity.ok(dailyRateService.addDailyItemRates(dailyRates));

    }
}
