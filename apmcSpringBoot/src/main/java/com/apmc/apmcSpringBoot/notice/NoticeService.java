package com.apmc.apmcSpringBoot.notice;

import com.apmc.apmcSpringBoot.Exception.Response;
import java.util.List;

public interface NoticeService {

    public List<Notice> getAllNotices();
    public List<Notice> getBeforeDate(int pageNumber, int pageSize);
    public String deleteNotice(int noticeId);
    public Response createNotice(Notice notice);
}