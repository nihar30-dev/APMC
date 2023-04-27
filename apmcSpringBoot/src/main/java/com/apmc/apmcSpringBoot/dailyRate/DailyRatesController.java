package com.apmc.apmcSpringBoot.dailyRate;


import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/dailyRates")
public class DailyRatesController {

    @Autowired
    private DailyRateService dailyRateService;

    @GetMapping("")
    public List<DailyRates> getDailyRatesByDate(@RequestParam String day) throws ParseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dateFormat.parse(day);
        List<DailyRates> dailyRatesList = dailyRateService.getAllItemsByDate(date);
        if (dailyRatesList.size() <= 0){
            throw new ResponseException("No Daily rates for this day");
        }
        return dailyRatesList;
    }

    @GetMapping("/{rateId}")
    public DailyRates getDailyRatesById(@PathVariable int rateId) {
        DailyRates dailyRates = dailyRateService.getDailyRatesById(rateId);
        if (dailyRates == null){
            throw new ResponseException("No Rates for this id");
        }
        return dailyRates;
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("")
    public Response addDailyRates(@RequestParam String day, @RequestBody DailyRates dailyRates) throws ParseException, ResponseException {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = dateFormat.parse(day);
        dailyRates.setDay(date);
        return dailyRateService.addDailyItemRates(dailyRates);

    }
}
