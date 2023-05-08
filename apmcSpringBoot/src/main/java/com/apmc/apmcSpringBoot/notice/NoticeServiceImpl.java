package com.apmc.apmcSpringBoot.notice;

import com.apmc.apmcSpringBoot.Exception.Response;
import com.apmc.apmcSpringBoot.Exception.ValidatorException;
import com.apmc.apmcSpringBoot.Exception.ValidatorResponse;
import com.apmc.apmcSpringBoot.notice.validation.NoticeValidatorImpl;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class NoticeServiceImpl implements NoticeService{

    @Autowired
    private NoticeRepository noticeRepository;
    @Override
    @Transactional
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    @Override
    @Transactional
    public List<Notice> getBeforeDate(int pageNumber, int pageSize) {
//        return noticeRepository.getNoticeBeforeEndDate();
        Pageable p = PageRequest.of(pageNumber, pageSize);
        Page<Notice> noticePage = this.noticeRepository.findAll(p);
        List<Notice>  allNotice = noticePage.getContent();

        return allNotice;
    }

    @Override
    @Transactional
    public String deleteNotice(int noticeId) {

        Notice notice = noticeRepository.findById(noticeId).orElse(null);
        try{
            if(notice == null){
                return "Could not find notice";
            }
            noticeRepository.deleteById(noticeId);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return "Could not find notice";
        }

        return "deleted";
    }

    @Override
    @Transactional
    public Response createNotice(Notice notice) throws ValidatorException{
        NoticeValidatorImpl noticeValidator = new NoticeValidatorImpl();
        ValidatorResponse validatorResponse = noticeValidator.checkNotice(notice);
        if(!validatorResponse.isStatus()){
//            throw new ValidatorException(validatorResponse.getMessage());
            return new Response(400, validatorResponse.getMessage() ,System.currentTimeMillis(), false);
        }
        try{
            if (notice.getStartDate() == null) {
                notice.setStartDate(new Date()); // Set startDate as current date
            }
            if (notice.getEndDate() == null) {
                Calendar calendar = Calendar.getInstance();
                calendar.setTime(notice.getStartDate());
                calendar.add(Calendar.DAY_OF_MONTH, 7); // Add 7 days to startDate
                notice.setEndDate(calendar.getTime());
            }
            noticeRepository.save(notice);

            return new Response(200,"Ok", System.currentTimeMillis(), true);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return new Response(400,e.getMessage(),System.currentTimeMillis(), false);
        }
    }
}