package com.apmc.apmcSpringBoot.controller;


import com.apmc.apmcSpringBoot.dao.DailyRateRepository;
import com.apmc.apmcSpringBoot.model.DailyRates;
import com.apmc.apmcSpringBoot.service.DailyRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/dailyRates")
public class DailyRatesController {

    @Autowired
    private DailyRateService dailyRateService;

    @GetMapping("")
    public List<DailyRates> getDailyRatesByDate(@RequestParam String day) throws ParseException {
        System.out.println(day);
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dateFormat.parse(day);
        return dailyRateService.getAllItemsByDate(date);
    }

}
