package com.apmc.apmcSpringBoot.notice;


import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ResponseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/notice")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;

    @GetMapping("")
    public ResponseEntity<?> getAllNotices() throws ResponseException{
        return ResponseEntity.ok(noticeService.getAllNotices());
    }

    @GetMapping("/notExpired")
    public ResponseEntity<?> getNoticeBeforeEndDate(@RequestParam(value = "pageNumber",defaultValue = "5", required = false) int pageNumber, @RequestParam(value = "pageSize", defaultValue = "0", required = false) int pageSize) throws ResponseException{
        return ResponseEntity.ok(noticeService.getBeforeDate(pageNumber, pageSize));
    }
    //    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @PostMapping("")
    public Response createNotice(@RequestBody Notice notice){
        return noticeService.createNotice(notice);
    }

    //    @PreAuthorize("hasAnyAuthority('ADMIN)")
    @DeleteMapping("/{noticeId}")
    public ResponseEntity<?> deleteSlot(@PathVariable int noticeId){
        return ResponseEntity.ok(noticeService.deleteNotice(noticeId));
    }

}

